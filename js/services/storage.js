/**
 * SmartFin - Hybrid Storage Service
 * Synchronizes with the backend SQLite database via REST APIs when available,
 * while maintaining 100% offline & client-side LocalStorage support.
 */

const STORAGE_KEYS = {
  PROFILE: "smartfin_user_profile",
  BUDGETS: "smartfin_budget_categories",
  EXPENSES: "smartfin_expenses_list",
  GOALS: "smartfin_savings_goals",
  SETTINGS: "smartfin_app_settings",
  API_ONLINE: "smartfin_api_online"
};

const StorageService = {
  isBackendConnected: false,

  /**
   * Initialize storage and check backend database connectivity
   */
  async init() {
    // 1. Initialize LocalStorage fallbacks if empty
    if (!localStorage.getItem(STORAGE_KEYS.PROFILE)) {
      this.saveLocalProfile(DEFAULT_USER_PROFILE);
    }
    if (!localStorage.getItem(STORAGE_KEYS.BUDGETS)) {
      this.saveLocalBudgets(DEFAULT_BUDGET_CATEGORIES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.EXPENSES)) {
      this.saveLocalExpenses(DEFAULT_EXPENSES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.GOALS)) {
      this.saveLocalGoals(DEFAULT_SAVINGS_GOALS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      this.saveSettings({
        currency: "INR",
        language: "en",
        theme: "light",
        notificationsEnabled: true
      });
    }

    // 2. Test Backend SQLite API connection
    try {
      const res = await fetch("/api/health");
      if (res.ok) {
        const data = await res.json();
        this.isBackendConnected = true;
        console.log(`[SmartFin Storage] Connected to backend database: ${data.database}`);
        this.updateDatabaseStatusBadge(true, data.database);

        // Fetch fresh state from database
        await this.syncFromBackend();
      } else {
        this.isBackendConnected = false;
        this.updateDatabaseStatusBadge(false);
      }
    } catch (e) {
      // Running standalone/offline or file protocol
      this.isBackendConnected = false;
      this.updateDatabaseStatusBadge(false);
      console.log("[SmartFin Storage] Operating in client-side LocalStorage mode.");
    }
  },

  updateDatabaseStatusBadge(isOnline, dbEngine = "SQLite") {
    const badgeEl = document.getElementById("dbStatusIndicator");
    if (badgeEl) {
      if (isOnline) {
        badgeEl.className = "db-status-pill online";
        badgeEl.innerHTML = `<span class="db-status-dot"></span><span>Cloud DB: ${dbEngine.toUpperCase()}</span>`;
        badgeEl.title = "Connected to persistent SQLite server database";
      } else {
        badgeEl.className = "db-status-pill offline";
        badgeEl.innerHTML = `<span class="db-status-dot"></span><span>Local Storage</span>`;
        badgeEl.title = "Data is saved locally in your browser";
      }
    }
  },

  async syncFromBackend() {
    try {
      const [profRes, budRes, expRes, goalRes] = await Promise.all([
        fetch("/api/profile"),
        fetch("/api/budgets"),
        fetch("/api/expenses"),
        fetch("/api/goals")
      ]);

      if (profRes.ok) {
        const p = await profRes.json();
        if (p.data) this.saveLocalProfile(p.data);
      }
      if (budRes.ok) {
        const b = await budRes.json();
        if (b.data && b.data.length > 0) this.saveLocalBudgets(b.data);
      }
      if (expRes.ok) {
        const e = await expRes.json();
        if (e.data && e.data.length > 0) this.saveLocalExpenses(e.data);
      }
      if (goalRes.ok) {
        const g = await goalRes.json();
        if (g.data && g.data.length > 0) this.saveLocalGoals(g.data);
      }
    } catch (err) {
      console.warn("Failed to sync from backend DB:", err.message);
    }
  },

  // ================= PROFILE =================
  getProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : { ...DEFAULT_USER_PROFILE };
    } catch (e) {
      return { ...DEFAULT_USER_PROFILE };
    }
  },

  saveLocalProfile(profile) {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  },

  saveProfile(profile) {
    this.saveLocalProfile(profile);

    // Sync to backend DB if online
    if (this.isBackendConnected) {
      fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      }).catch(err => console.warn("Backend profile sync error:", err));
    }
    return true;
  },

  // ================= BUDGETS =================
  getBudgets() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BUDGETS);
      return data ? JSON.parse(data) : [...DEFAULT_BUDGET_CATEGORIES];
    } catch (e) {
      return [...DEFAULT_BUDGET_CATEGORIES];
    }
  },

  saveLocalBudgets(budgets) {
    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
  },

  saveBudgets(budgets) {
    this.saveLocalBudgets(budgets);

    if (this.isBackendConnected) {
      fetch("/api/budgets", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ budgets })
      }).catch(err => console.warn("Backend budgets sync error:", err));
    }
    return true;
  },

  // ================= EXPENSES =================
  getExpenses() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EXPENSES);
      return data ? JSON.parse(data) : [...DEFAULT_EXPENSES];
    } catch (e) {
      return [...DEFAULT_EXPENSES];
    }
  },

  saveLocalExpenses(expenses) {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  },

  saveExpenses(expenses) {
    this.saveLocalExpenses(expenses);
    return true;
  },

  addExpense(expense) {
    const expenses = this.getExpenses();
    const newExpense = {
      ...expense,
      id: "exp-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4)
    };
    expenses.unshift(newExpense);
    this.saveLocalExpenses(expenses);

    if (this.isBackendConnected) {
      fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExpense)
      }).catch(err => console.warn("Backend expense sync error:", err));
    }

    return newExpense;
  },

  updateExpense(id, updatedExpense) {
    const expenses = this.getExpenses();
    const index = expenses.findIndex(e => e.id === id);
    if (index !== -1) {
      expenses[index] = { ...expenses[index], ...updatedExpense, id };
      this.saveLocalExpenses(expenses);

      if (this.isBackendConnected) {
        fetch(`/api/expenses/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(expenses[index])
        }).catch(err => console.warn("Backend expense update error:", err));
      }

      return expenses[index];
    }
    return null;
  },

  deleteExpense(id) {
    const expenses = this.getExpenses();
    const filtered = expenses.filter(e => e.id !== id);
    this.saveLocalExpenses(filtered);

    if (this.isBackendConnected) {
      fetch(`/api/expenses/${id}`, {
        method: "DELETE"
      }).catch(err => console.warn("Backend expense delete error:", err));
    }

    return filtered;
  },

  // ================= SAVINGS GOALS =================
  getGoals() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GOALS);
      return data ? JSON.parse(data) : [...DEFAULT_SAVINGS_GOALS];
    } catch (e) {
      return [...DEFAULT_SAVINGS_GOALS];
    }
  },

  saveLocalGoals(goals) {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  },

  addGoal(goal) {
    const goals = this.getGoals();
    const newGoal = {
      ...goal,
      id: "goal-" + Date.now()
    };
    goals.push(newGoal);
    this.saveLocalGoals(goals);

    if (this.isBackendConnected) {
      fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGoal)
      }).catch(err => console.warn("Backend goal sync error:", err));
    }

    return newGoal;
  },

  updateGoal(id, updatedFields) {
    const goals = this.getGoals();
    const index = goals.findIndex(g => g.id === id);
    if (index !== -1) {
      goals[index] = { ...goals[index], ...updatedFields, id };
      this.saveLocalGoals(goals);

      if (this.isBackendConnected) {
        fetch(`/api/goals/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(goals[index])
        }).catch(err => console.warn("Backend goal update error:", err));
      }

      return goals[index];
    }
    return null;
  },

  addFundsToGoal(id, amount) {
    const goals = this.getGoals();
    const index = goals.findIndex(g => g.id === id);
    if (index !== -1) {
      goals[index].currentAmount = Number(goals[index].currentAmount) + Number(amount);
      if (goals[index].currentAmount > goals[index].targetAmount) {
        goals[index].currentAmount = goals[index].targetAmount;
      }
      this.saveLocalGoals(goals);

      if (this.isBackendConnected) {
        fetch(`/api/goals/${id}/funds`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount })
        }).catch(err => console.warn("Backend goal funds error:", err));
      }

      return goals[index];
    }
    return null;
  },

  deleteGoal(id) {
    const goals = this.getGoals();
    const filtered = goals.filter(g => g.id !== id);
    this.saveLocalGoals(filtered);

    if (this.isBackendConnected) {
      fetch(`/api/goals/${id}`, {
        method: "DELETE"
      }).catch(err => console.warn("Backend goal delete error:", err));
    }

    return filtered;
  },

  // ================= SETTINGS =================
  getSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : { currency: "INR", language: "en", theme: "light" };
    } catch (e) {
      return { currency: "INR", language: "en", theme: "light" };
    }
  },

  saveSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  // ================= BACKUP & RESTORE =================
  exportAllData() {
    return {
      profile: this.getProfile(),
      budgets: this.getBudgets(),
      expenses: this.getExpenses(),
      goals: this.getGoals(),
      settings: this.getSettings(),
      exportedAt: new Date().toISOString(),
      version: "1.0.0"
    };
  },

  importData(jsonData) {
    try {
      const parsed = typeof jsonData === "string" ? JSON.parse(jsonData) : jsonData;
      if (parsed.profile) this.saveProfile(parsed.profile);
      if (parsed.budgets) this.saveBudgets(parsed.budgets);
      if (parsed.expenses) this.saveExpenses(parsed.expenses);
      if (parsed.goals) this.saveLocalGoals(parsed.goals);
      if (parsed.settings) this.saveSettings(parsed.settings);
      return { success: true };
    } catch (e) {
      console.error("Failed to import data", e);
      return { success: false, error: e.message };
    }
  },

  resetToDefaults() {
    this.saveLocalProfile(DEFAULT_USER_PROFILE);
    this.saveLocalBudgets(DEFAULT_BUDGET_CATEGORIES);
    this.saveLocalExpenses(DEFAULT_EXPENSES);
    this.saveLocalGoals(DEFAULT_SAVINGS_GOALS);

    if (this.isBackendConnected) {
      fetch("/api/reset", { method: "POST" })
        .catch(err => console.warn("Backend reset error:", err));
    }
    return true;
  },

  clearAllData() {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    this.init();
    return true;
  }
};
