/**
 * SmartFin - Main Application Controller
 * Handles Navigation, State Synchronization, Charts, Calculators, Modals, and Scheme Engine.
 */

const App = {
  currentView: "home",
  activeStatusFilter: "all",
  activeCategoryFilter: "all",
  currentLang: "en",
  incomeChartInstance: null,
  categoryChartInstance: null,

  /**
   * Bootstraps the entire SmartFin application
   */
  async init() {
    // 1. Initialize Storage & Backend DB sync
    await StorageService.init();

    // 2. Populate Dropdowns (Districts & Categories)
    this.populateDistricts();
    this.populateCategoryPills();

    // 3. Setup Navigation & Hash Listeners
    this.setupNavigation();

    // 4. Setup Event Listeners
    this.setupEventListeners();

    // 5. Populate Forms from Profile
    this.loadProfileIntoForms();

    // 6. Initial Render of Data
    this.refreshAllData();

    // 7. Check URL Hash
    const hash = window.location.hash.replace("#", "");
    if (hash && document.getElementById("view-" + hash)) {
      this.navigateTo(hash);
    } else {
      this.navigateTo("home");
    }

    console.log("SmartFin App Initialized Successfully.");
  },

  // ================= NAVIGATION =================
  setupNavigation() {
    // Handle link clicks
    document.querySelectorAll("[data-view]").forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const view = el.getAttribute("data-view");
        this.navigateTo(view);
      });
    });

    // Mobile Hamburger
    const mobileBtn = document.getElementById("mobileMenuBtn");
    const sidebar = document.getElementById("appSidebar");
    if (mobileBtn && sidebar) {
      mobileBtn.addEventListener("click", () => {
        sidebar.classList.toggle("sidebar-open");
      });
    }

    // Close sidebar on click outside in mobile
    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 992 && sidebar && sidebar.classList.contains("sidebar-open")) {
        if (!sidebar.contains(e.target) && !mobileBtn.contains(e.target)) {
          sidebar.classList.remove("sidebar-open");
        }
      }
    });

    // Window Hashchange
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && document.getElementById("view-" + hash)) {
        this.navigateTo(hash, false);
      }
    });
  },

  navigateTo(viewId, updateHash = true) {
    const targetView = document.getElementById("view-" + viewId);
    if (!targetView) return;

    this.currentView = viewId;

    // Close mobile sidebar if open
    const sidebar = document.getElementById("appSidebar");
    if (sidebar) sidebar.classList.remove("sidebar-open");

    // Update active view DOM
    document.querySelectorAll(".page-view").forEach(v => v.classList.remove("active-view"));
    targetView.classList.add("active-view");

    // Update Nav Link Active States
    document.querySelectorAll(".nav-item, .bottom-bar-item").forEach(item => {
      if (item.getAttribute("data-view") === viewId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Update Topbar Titles
    const titleEl = document.getElementById("pageTitle");
    const subtitleEl = document.getElementById("pageSubtitle");
    const viewMetadata = {
      home: { title: "Home", subtitle: "Plan Better. Save Smarter. Discover Your Benefits." },
      dashboard: { title: "Dashboard", subtitle: "Financial summary, monthly spending and health metrics" },
      budget: { title: "Budget Planner", subtitle: "Plan household expenses with the 50/30/20 guideline" },
      expenses: { title: "Expense Tracker", subtitle: "Log, filter, and audit all household expenditures" },
      goals: { title: "Savings Goals", subtitle: "Set target milestones and track your accumulated funds" },
      "scheme-finder": { title: "Find Schemes for Me", subtitle: "Personalized Karnataka & Central welfare scheme eligibility" },
      schemes: { title: "Government Schemes", subtitle: "Verified directory of official government welfare programs" },
      literacy: { title: "Financial Literacy", subtitle: "Practical guides, calculators, and cyber fraud awareness" },
      insights: { title: "Smart Insights", subtitle: "Actionable financial suggestions and wealth projections" },
      profile: { title: "Citizen Profile", subtitle: "Household demographics for scheme matching and budgeting" },
      settings: { title: "Settings & Backup", subtitle: "Data backup, restore, and application configuration" }
    };

    const meta = viewMetadata[viewId] || { title: "SmartFin", subtitle: "Karnataka Financial Planner" };
    if (titleEl) titleEl.innerHTML = `<span>${meta.title}</span>`;
    if (subtitleEl) subtitleEl.textContent = meta.subtitle;

    if (updateHash) {
      window.location.hash = viewId;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    // Re-render view specific items
    if (viewId === "dashboard") {
      this.renderDashboard();
    } else if (viewId === "budget") {
      this.renderBudgetPlanner();
    } else if (viewId === "expenses") {
      this.renderExpensesTable();
    } else if (viewId === "goals") {
      this.renderGoals();
    } else if (viewId === "scheme-finder") {
      this.runEligibilityEvaluation();
    } else if (viewId === "schemes") {
      this.renderSchemesDirectory();
    } else if (viewId === "literacy") {
      this.renderLiteracyModules();
    } else if (viewId === "insights") {
      this.renderSmartInsights();
    }
  },

  // ================= POPULATORS & EVENT LISTENERS =================
  populateDistricts() {
    const finderSelect = document.getElementById("finderDistrict");
    const profileSelect = document.getElementById("profileDistrict");

    const optionsHtml = KARNATAKA_DISTRICTS.map(dist => `<option value="${dist}">${dist}</option>`).join("");

    if (finderSelect) finderSelect.innerHTML = optionsHtml;
    if (profileSelect) profileSelect.innerHTML = optionsHtml;
  },

  populateCategoryPills() {
    const container = document.getElementById("schemeCategoryPillsBar");
    if (!container) return;

    container.innerHTML = SCHEME_CATEGORIES.map(cat => `
      <button class="category-pill-btn ${cat.id === 'all' ? 'active' : ''}" data-cat="${cat.id}">
        <span>${cat.icon}</span>
        <span>${cat.name}</span>
      </button>
    `).join("");

    container.querySelectorAll(".category-pill-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".category-pill-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeCategoryFilter = btn.getAttribute("data-cat");
        this.renderSchemesDirectory();
      });
    });
  },

  setupEventListeners() {
    // Quick Add Expense button in topbar
    const quickAddBtn = document.getElementById("quickAddExpenseBtn");
    if (quickAddBtn) {
      quickAddBtn.addEventListener("click", () => this.openAddExpenseModal());
    }

    // Quick Find Schemes in topbar
    const quickFindBtn = document.getElementById("quickFindSchemesBtn");
    if (quickFindBtn) {
      quickFindBtn.addEventListener("click", () => this.navigateTo("scheme-finder"));
    }

    // Language Toggle
    const langBtn = document.getElementById("langToggleBtn");
    if (langBtn) {
      langBtn.addEventListener("click", () => this.toggleLanguage());
    }

    // Profile pill in sidebar
    const profilePill = document.getElementById("sidebarUserProfilePill");
    if (profilePill) {
      profilePill.addEventListener("click", () => this.navigateTo("profile"));
    }

    // Budget Auto 50/30/20 & Save
    const btnAuto503020 = document.getElementById("btnAuto503020");
    if (btnAuto503020) {
      btnAuto503020.addEventListener("click", () => this.autoApply503020Rule());
    }

    const btnSaveBudget = document.getElementById("btnSaveBudgetLimits");
    if (btnSaveBudget) {
      btnSaveBudget.addEventListener("click", () => this.saveCategoryBudgetLimits());
    }

    // Expense Filters
    ["expenseSearchInput", "expenseCategoryFilter", "expensePaymentFilter", "expenseSortFilter"].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", () => this.renderExpensesTable());
        el.addEventListener("change", () => this.renderExpensesTable());
      }
    });

    // Export Expenses to CSV
    const btnExportExp = document.getElementById("btnExportExpenses");
    if (btnExportExp) {
      btnExportExp.addEventListener("click", () => this.exportExpensesCSV());
    }

    // Scheme Directory Search & Level Filter
    const dirSearch = document.getElementById("directorySearchInput");
    const dirLevel = document.getElementById("directoryLevelFilter");
    if (dirSearch) dirSearch.addEventListener("input", () => this.renderSchemesDirectory());
    if (dirLevel) dirLevel.addEventListener("change", () => this.renderSchemesDirectory());

    // Settings Buttons
    const btnExportJSON = document.getElementById("btnExportJSON");
    if (btnExportJSON) {
      btnExportJSON.addEventListener("click", () => this.downloadJSONBackup());
    }

    const btnResetDemo = document.getElementById("btnResetDemoData");
    if (btnResetDemo) {
      btnResetDemo.addEventListener("click", () => {
        if (confirm("Reset all financial budgets, expenses, and profile to Karnataka demo defaults?")) {
          StorageService.resetToDefaults();
          this.loadProfileIntoForms();
          this.refreshAllData();
          this.showToast("Reset to demo data successfully!", "success");
        }
      });
    }

    const btnClearAll = document.getElementById("btnClearAllData");
    if (btnClearAll) {
      btnClearAll.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete all saved data? This cannot be undone.")) {
          StorageService.clearAllData();
          this.loadProfileIntoForms();
          this.refreshAllData();
          this.showToast("All data cleared from LocalStorage.", "info");
        }
      });
    }

    // Profile Save Button
    const btnSaveProf = document.getElementById("btnSaveProfile");
    if (btnSaveProf) {
      btnSaveProf.addEventListener("click", () => this.saveUserProfile());
    }
  },

  // ================= LANGUAGE TOGGLE =================
  toggleLanguage() {
    this.currentLang = this.currentLang === "en" ? "kn" : "en";
    const label = document.getElementById("currentLangLabel");
    if (label) label.textContent = this.currentLang === "en" ? "EN" : "ಕನ್ನಡ";

    this.showToast(
      this.currentLang === "en" ? "Language switched to English" : "ಕನ್ನಡ ಭಾಷೆಗೆ ಬದಲಾಯಿಸಲಾಗಿದೆ",
      "info"
    );
    this.refreshAllData();
  },

  // ================= PROFILE SYNC =================
  loadProfileIntoForms() {
    const profile = StorageService.getProfile();

    // Update Sidebar Profile Pill
    const avatarEl = document.getElementById("sidebarUserAvatar");
    const nameEl = document.getElementById("sidebarUserName");
    const locEl = document.getElementById("sidebarUserLoc");

    if (avatarEl) {
      const initials = (profile.name || "AK").split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
      avatarEl.textContent = initials || "KA";
    }
    if (nameEl) nameEl.textContent = profile.name || "Karnataka Citizen";
    if (locEl) locEl.textContent = `${profile.district || "Bengaluru"}, Karnataka`;

    // Populate Scheme Finder Form
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val !== undefined ? val : "";
    };
    const setCheck = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.checked = Boolean(val);
    };

    setVal("finderAge", profile.age);
    setVal("finderGender", profile.gender);
    setVal("finderDistrict", profile.district);
    setVal("finderAnnualIncome", profile.annualIncome);
    setVal("finderOccupation", profile.occupation);
    setVal("finderEmploymentStatus", profile.employmentStatus);
    setVal("finderEducation", profile.education);
    setVal("finderFarmerStatus", profile.farmerStatus);
    setVal("finderRationCard", profile.rationCardType);
    setCheck("finderDisability", profile.disabilityStatus === "Yes");
    setCheck("finderTaxPayer", profile.taxPayer);
    setCheck("finderGirlChild", profile.hasGirlChildUnder10);

    // Populate Profile Tab Form
    setVal("profileName", profile.name);
    setVal("profilePhone", profile.phone);
    setVal("profileAge", profile.age);
    setVal("profileGender", profile.gender);
    setVal("profileDistrict", profile.district);
    setVal("profileMonthlyIncome", profile.monthlyIncome);
    setVal("profileAnnualIncome", profile.annualIncome);
    setVal("profileOccupation", profile.occupation);
    setVal("profileEmploymentStatus", profile.employmentStatus);
    setVal("profileEducation", profile.education);
    setVal("profileFarmerStatus", profile.farmerStatus);
    setVal("profileRationCard", profile.rationCardType);
    setCheck("profileDisability", profile.disabilityStatus === "Yes");
    setCheck("profileTaxPayer", profile.taxPayer);
    setCheck("profileGirlChild", profile.hasGirlChildUnder10);
  },

  saveUserProfile() {
    const profile = StorageService.getProfile();

    const getVal = (id) => {
      const el = document.getElementById(id);
      return el ? el.value : "";
    };
    const getCheck = (id) => {
      const el = document.getElementById(id);
      return el ? el.checked : false;
    };

    profile.name = getVal("profileName") || "Karnataka Citizen";
    profile.phone = getVal("profilePhone");
    profile.age = Number(getVal("profileAge")) || 28;
    profile.gender = getVal("profileGender");
    profile.district = getVal("profileDistrict") || "Bengaluru Urban";
    profile.monthlyIncome = Number(getVal("profileMonthlyIncome")) || 30000;
    profile.annualIncome = Number(getVal("profileAnnualIncome")) || (profile.monthlyIncome * 12);
    profile.occupation = getVal("profileOccupation");
    profile.employmentStatus = getVal("profileEmploymentStatus");
    profile.education = getVal("profileEducation");
    profile.farmerStatus = getVal("profileFarmerStatus");
    profile.rationCardType = getVal("profileRationCard");
    profile.disabilityStatus = getCheck("profileDisability") ? "Yes" : "No";
    profile.taxPayer = getCheck("profileTaxPayer");
    profile.hasGirlChildUnder10 = getCheck("profileGirlChild");

    StorageService.saveProfile(profile);
    this.loadProfileIntoForms();
    this.refreshAllData();
    this.showToast("Profile details updated successfully!", "success");
  },

  refreshAllData() {
    if (this.currentView === "dashboard") this.renderDashboard();
    if (this.currentView === "budget") this.renderBudgetPlanner();
    if (this.currentView === "expenses") this.renderExpensesTable();
    if (this.currentView === "goals") this.renderGoals();
    if (this.currentView === "scheme-finder") this.runEligibilityEvaluation();
    if (this.currentView === "schemes") this.renderSchemesDirectory();
    if (this.currentView === "literacy") this.renderLiteracyModules();
    if (this.currentView === "insights") this.renderSmartInsights();
  },

  // ================= DASHBOARD RENDERING & CHARTS =================
  renderDashboard() {
    const profile = StorageService.getProfile();
    const budgets = StorageService.getBudgets();
    const expenses = StorageService.getExpenses();
    const goals = StorageService.getGoals();

    const evaluatedSchemes = EligibilityEngine.evaluateAllSchemes(profile, SCHEMES_DATABASE);
    const summary = InsightsEngine.calculateFinancialSummary(profile, budgets, expenses, goals);

    // 1. Update Metrics Cards
    const incEl = document.getElementById("dashIncome");
    const expEl = document.getElementById("dashExpenses");
    const balEl = document.getElementById("dashBalance");
    const savRateEl = document.getElementById("dashSavingsRate");
    const budUtilEl = document.getElementById("dashBudgetUtil");
    const expRatioText = document.getElementById("dashExpenseRatioText");
    const budUtilText = document.getElementById("dashBudgetUtilText");
    const eligCountEl = document.getElementById("dashEligibleCount");

    if (incEl) incEl.textContent = `₹${summary.monthlyIncome.toLocaleString("en-IN")}`;
    if (expEl) expEl.textContent = `₹${summary.totalExpenses.toLocaleString("en-IN")}`;
    if (balEl) balEl.textContent = `₹${summary.remainingBalance.toLocaleString("en-IN")}`;
    if (savRateEl) savRateEl.textContent = `${summary.savingsRate}%`;
    if (budUtilEl) budUtilEl.textContent = `${summary.budgetUtilization}%`;
    if (expRatioText) expRatioText.textContent = `${summary.expenseRatio}% of monthly income`;
    if (budUtilText) {
      budUtilText.textContent = summary.budgetUtilization > 100 
        ? "Exceeded budget!" 
        : "Within planned limits";
    }

    const likelyCount = evaluatedSchemes.filter(s => s.status === "likely").length;
    if (eligCountEl) eligCountEl.textContent = `${likelyCount} Likely Eligible`;

    // 2. Health Score Circle
    const healthScoreEl = document.getElementById("dashHealthScore");
    const healthTitleEl = document.getElementById("dashHealthTitle");
    const healthDescEl = document.getElementById("dashHealthDesc");

    if (healthScoreEl) {
      healthScoreEl.innerHTML = `<span>${summary.healthScore}</span><small>/100</small>`;
      healthScoreEl.style.borderColor = summary.healthScore >= 75 ? "#10b981" : summary.healthScore >= 50 ? "#f59e0b" : "#ef4444";
    }
    if (healthTitleEl) healthTitleEl.textContent = summary.healthStatus;
    if (healthDescEl) {
      healthDescEl.textContent = `Savings Rate is ${summary.savingsRate}% and your emergency fund covers ${summary.emergencyMonthsCovered} months of expenses.`;
    }

    // 3. Render Chart 1: Income vs Expenses vs Savings
    this.renderIncomeVsExpenseChart(summary);

    // 4. Render Chart 2: Category Spending Breakdown
    this.renderCategoryChart(summary, budgets);

    // 5. Render Recent Expenses List
    this.renderDashRecentExpenses(expenses);

    // 6. Render Active Goals Preview
    this.renderDashGoalsPreview(goals);
  },

  renderIncomeVsExpenseChart(summary) {
    const canvas = document.getElementById("incomeVsExpenseChart");
    if (!canvas) return;

    if (this.incomeChartInstance) {
      this.incomeChartInstance.destroy();
    }

    const ctx = canvas.getContext("2d");
    this.incomeChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Monthly Income", "Total Expenses", "Monthly Savings"],
        datasets: [{
          label: "Amount (₹)",
          data: [summary.monthlyIncome, summary.totalExpenses, summary.monthlySavings],
          backgroundColor: ["#10b981", "#ef4444", "#2563eb"],
          borderRadius: 8,
          barPercentage: 0.55
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (item) => ` ₹${Number(item.raw).toLocaleString("en-IN")}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (val) => "₹" + (val >= 1000 ? (val / 1000) + "k" : val)
            },
            grid: { color: "#f1f5f9" }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  },

  renderCategoryChart(summary, budgets) {
    const canvas = document.getElementById("categorySpendingChart");
    if (!canvas) return;

    if (this.categoryChartInstance) {
      this.categoryChartInstance.destroy();
    }

    const labels = [];
    const dataValues = [];
    const bgColors = [];

    budgets.forEach(b => {
      const spent = summary.categorySpending[b.id] || 0;
      if (spent > 0) {
        labels.push(b.name);
        dataValues.push(spent);
        bgColors.push(b.color || "#3b82f6");
      }
    });

    // If no expenses logged yet
    if (dataValues.length === 0) {
      labels.push("No Expenses Yet");
      dataValues.push(1);
      bgColors.push("#cbd5e1");
    }

    const ctx = canvas.getContext("2d");
    this.categoryChartInstance = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels,
        datasets: [{
          data: dataValues,
          backgroundColor: bgColors,
          borderWidth: 2,
          borderColor: "#ffffff"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              boxWidth: 12,
              font: { size: 11 }
            }
          },
          tooltip: {
            callbacks: {
              label: (item) => ` ${item.label}: ₹${Number(item.raw).toLocaleString("en-IN")}`
            }
          }
        },
        cutout: "68%"
      }
    });
  },

  renderDashRecentExpenses(expenses) {
    const container = document.getElementById("dashRecentExpensesList");
    if (!container) return;

    const recent = expenses.slice(0, 5);
    if (recent.length === 0) {
      container.innerHTML = `<p style="font-size: 13px; color: var(--text-muted); text-align: center; padding: 20px;">No expenses recorded yet.</p>`;
      return;
    }

    container.innerHTML = recent.map(exp => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border-color-subtle);">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: var(--radius-sm); background: #f1f5f9; display: flex; align-items: center; justify-content: center; font-size: 16px;">
            ${this.getCategoryIcon(exp.category)}
          </div>
          <div>
            <div style="font-size: 13px; font-weight: 600; color: var(--slate-800);">${exp.description}</div>
            <div style="font-size: 11px; color: var(--text-muted);">${exp.date} • ${exp.paymentMethod || "UPI"}</div>
          </div>
        </div>
        <div style="font-size: 14px; font-weight: 700; color: var(--slate-900);">₹${Number(exp.amount).toLocaleString("en-IN")}</div>
      </div>
    `).join("");
  },

  renderDashGoalsPreview(goals) {
    const container = document.getElementById("dashGoalsPreviewList");
    if (!container) return;

    if (goals.length === 0) {
      container.innerHTML = `<p style="font-size: 13px; color: var(--text-muted); text-align: center; padding: 20px;">No savings goals set. Click 'Manage Goals' to start.</p>`;
      return;
    }

    container.innerHTML = goals.slice(0, 3).map(g => {
      const pct = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100));
      return `
        <div style="padding: 10px 0; border-bottom: 1px solid var(--border-color-subtle);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <div style="font-size: 13px; font-weight: 600; color: var(--slate-800);">${g.icon || "🎯"} ${g.title}</div>
            <div style="font-size: 12px; font-weight: 700; color: var(--primary);">${pct}%</div>
          </div>
          <div style="height: 6px; background: #e2e8f0; border-radius: 999px; overflow: hidden; margin-bottom: 4px;">
            <div style="height: 100%; width: ${pct}%; background: linear-gradient(90deg, #2563eb, #10b981);"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted);">
            <span>₹${Number(g.currentAmount).toLocaleString("en-IN")} saved</span>
            <span>Target: ₹${Number(g.targetAmount).toLocaleString("en-IN")}</span>
          </div>
        </div>
      `;
    }).join("");
  },

  // ================= BUDGET PLANNER =================
  renderBudgetPlanner() {
    const profile = StorageService.getProfile();
    const budgets = StorageService.getBudgets();
    const expenses = StorageService.getExpenses();

    // Calculate category spending
    const categorySpending = {};
    let totalExpenses = 0;
    expenses.forEach(e => {
      const amt = Number(e.amount) || 0;
      totalExpenses += amt;
      categorySpending[e.category] = (categorySpending[e.category] || 0) + amt;
    });

    const monthlyIncome = Number(profile.monthlyIncome) || 0;
    const remainingBalance = monthlyIncome - totalExpenses;

    // Formula result string
    const formulaEl = document.getElementById("budgetFormulaResult");
    if (formulaEl) {
      formulaEl.innerHTML = `
        Income (₹${monthlyIncome.toLocaleString("en-IN")}) − Expenses (₹${totalExpenses.toLocaleString("en-IN")}) = 
        <span style="color: ${remainingBalance >= 0 ? '#10b981' : '#ef4444'};">₹${remainingBalance.toLocaleString("en-IN")} Remaining</span>
      `;
    }

    // 50/30/20 Breakdown
    let needsSpent = 0;
    let wantsSpent = 0;
    budgets.forEach(b => {
      const s = categorySpending[b.id] || 0;
      if (b.type === "want") wantsSpent += s;
      else needsSpent += s;
    });

    const needsPct = monthlyIncome > 0 ? Math.min(100, Math.round((needsSpent / monthlyIncome) * 100)) : 50;
    const wantsPct = monthlyIncome > 0 ? Math.min(100, Math.round((wantsSpent / monthlyIncome) * 100)) : 30;
    const savingsPct = monthlyIncome > 0 ? Math.max(0, 100 - needsPct - wantsPct) : 20;

    const segNeeds = document.getElementById("barSegNeeds");
    const segWants = document.getElementById("barSegWants");
    const segSavings = document.getElementById("barSegSavings");
    if (segNeeds) {
      segNeeds.style.width = needsPct + "%";
      segNeeds.textContent = `Needs (${needsPct}%)`;
    }
    if (segWants) {
      segWants.style.width = wantsPct + "%";
      segWants.textContent = `Wants (${wantsPct}%)`;
    }
    if (segSavings) {
      segSavings.style.width = savingsPct + "%";
      segSavings.textContent = `Savings (${savingsPct}%)`;
    }

    const legNeeds = document.getElementById("legendNeedsVal");
    const legWants = document.getElementById("legendWantsVal");
    const legSavings = document.getElementById("legendSavingsVal");
    if (legNeeds) legNeeds.textContent = `₹${needsSpent.toLocaleString("en-IN")}`;
    if (legWants) legWants.textContent = `₹${wantsSpent.toLocaleString("en-IN")}`;
    if (legSavings) legSavings.textContent = `₹${Math.max(0, remainingBalance).toLocaleString("en-IN")}`;

    // Render Category Items List
    const container = document.getElementById("categoryBudgetContainer");
    if (!container) return;

    container.innerHTML = budgets.map(b => {
      const spent = categorySpending[b.id] || 0;
      const budgeted = Number(b.budgeted) || 0;
      const pct = budgeted > 0 ? Math.round((spent / budgeted) * 100) : 0;

      let progressColorClass = "progress-green";
      let statusNotice = "";
      if (pct >= 100) {
        progressColorClass = "progress-red";
        statusNotice = `<span style="color: #ef4444; font-weight: 700;"><i class="fa-solid fa-triangle-exclamation"></i> Over budget by ₹${(spent - budgeted).toLocaleString("en-IN")}</span>`;
      } else if (pct >= 75) {
        progressColorClass = "progress-amber";
        statusNotice = `<span style="color: #d97706; font-weight: 600;"><i class="fa-solid fa-bell"></i> Nearing budget limit (${pct}%)</span>`;
      } else {
        statusNotice = `<span style="color: #10b981;">₹${(budgeted - spent).toLocaleString("en-IN")} remaining</span>`;
      }

      return `
        <div class="category-budget-item">
          <div class="cat-budget-header">
            <div class="cat-identity">
              <div class="cat-icon-badge">${b.icon || "📦"}</div>
              <div class="cat-names-box">
                <span class="cat-name-primary">${b.name}</span>
                <span class="cat-type-pill ${b.type === 'want' ? 'pill-want' : 'pill-need'}">${b.type}</span>
              </div>
            </div>
            <div class="cat-amounts-box">
              <span class="cat-spent-val">₹${spent.toLocaleString("en-IN")}</span>
              <div style="display: flex; align-items: center; gap: 6px; margin-top: 4px;">
                <span class="cat-budget-val">Limit: ₹</span>
                <input type="number" class="inline-edit-input" data-budget-cat="${b.id}" value="${budgeted}" step="100">
              </div>
            </div>
          </div>
          
          <div class="cat-progress-wrap">
            <div class="cat-progress-bar ${progressColorClass}" style="width: ${Math.min(100, pct)}%;"></div>
          </div>

          <div class="cat-budget-footer">
            <div>${statusNotice}</div>
            <div style="font-weight: 600;">${pct}% used</div>
          </div>
        </div>
      `;
    }).join("");
  },

  autoApply503020Rule() {
    const profile = StorageService.getProfile();
    const income = Number(profile.monthlyIncome) || 30000;

    // 50% Needs = income * 0.5
    // 30% Wants = income * 0.3
    const needsBudget = income * 0.5;
    const wantsBudget = income * 0.3;

    const budgets = StorageService.getBudgets();
    
    // Distribute proportionally across categories
    budgets.forEach(b => {
      if (b.id === "food") b.budgeted = Math.round(needsBudget * 0.40);
      else if (b.id === "rent") b.budgeted = Math.round(needsBudget * 0.35);
      else if (b.id === "education") b.budgeted = Math.round(needsBudget * 0.10);
      else if (b.id === "transport") b.budgeted = Math.round(needsBudget * 0.08);
      else if (b.id === "electricity") b.budgeted = Math.round(needsBudget * 0.04);
      else if (b.id === "healthcare") b.budgeted = Math.round(needsBudget * 0.03);
      else if (b.id === "entertainment") b.budgeted = Math.round(wantsBudget * 0.40);
      else if (b.id === "shopping") b.budgeted = Math.round(wantsBudget * 0.40);
      else if (b.id === "other") b.budgeted = Math.round(wantsBudget * 0.20);
    });

    StorageService.saveBudgets(budgets);
    this.renderBudgetPlanner();
    this.showToast("Applied 50/30/20 budget recommendation based on monthly income!", "success");
  },

  saveCategoryBudgetLimits() {
    const inputs = document.querySelectorAll("[data-budget-cat]");
    const budgets = StorageService.getBudgets();

    inputs.forEach(inp => {
      const catId = inp.getAttribute("data-budget-cat");
      const val = Number(inp.value) || 0;
      const b = budgets.find(item => item.id === catId);
      if (b) b.budgeted = val;
    });

    StorageService.saveBudgets(budgets);
    this.renderBudgetPlanner();
    this.showToast("Budget limits saved successfully!", "success");
  },

  // ================= EXPENSE TRACKER =================
  renderExpensesTable() {
    const expenses = StorageService.getExpenses();
    const searchVal = (document.getElementById("expenseSearchInput")?.value || "").toLowerCase().trim();
    const catFilter = document.getElementById("expenseCategoryFilter")?.value || "all";
    const payFilter = document.getElementById("expensePaymentFilter")?.value || "all";
    const sortFilter = document.getElementById("expenseSortFilter")?.value || "date-desc";

    let filtered = expenses.filter(exp => {
      if (catFilter !== "all" && exp.category !== catFilter) return false;
      if (payFilter !== "all" && exp.paymentMethod !== payFilter) return false;
      if (searchVal) {
        const text = `${exp.description} ${exp.categoryName || ''} ${exp.paymentMethod || ''}`.toLowerCase();
        if (!text.includes(searchVal)) return false;
      }
      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      if (sortFilter === "date-desc") return new Date(b.date) - new Date(a.date);
      if (sortFilter === "date-asc") return new Date(a.date) - new Date(b.date);
      if (sortFilter === "amount-desc") return Number(b.amount) - Number(a.amount);
      if (sortFilter === "amount-asc") return Number(a.amount) - Number(b.amount);
      return 0;
    });

    const tbody = document.getElementById("expensesTableBody");
    if (!tbody) return;

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 32px; color: var(--text-muted);">
            No matching expenses found.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(exp => `
      <tr>
        <td style="white-space: nowrap;">${exp.date}</td>
        <td>
          <span style="display: flex; align-items: center; gap: 6px;">
            <span>${this.getCategoryIcon(exp.category)}</span>
            <span>${exp.categoryName || exp.category}</span>
          </span>
        </td>
        <td style="font-weight: 500;">${exp.description}</td>
        <td><span class="payment-tag">${exp.paymentMethod || 'UPI'}</span></td>
        <td style="text-align: right;" class="cell-amount">₹${Number(exp.amount).toLocaleString("en-IN")}</td>
        <td style="text-align: center; white-space: nowrap;">
          <button class="table-action-btn" title="Edit" onclick="App.openEditExpenseModal('${exp.id}')">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="table-action-btn btn-delete" title="Delete" onclick="App.deleteExpensePrompt('${exp.id}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `).join("");
  },

  openAddExpenseModal() {
    document.getElementById("modalExpenseTitle").textContent = "Add Daily Expense";
    document.getElementById("expFormId").value = "";
    document.getElementById("expFormAmount").value = "";
    document.getElementById("expFormDate").value = new Date().toISOString().split("T")[0];
    document.getElementById("expFormDesc").value = "";
    document.getElementById("expFormCategory").value = "food";
    document.getElementById("expFormPayment").value = "UPI";
    this.openModal("modalExpense");
  },

  openEditExpenseModal(id) {
    const expenses = StorageService.getExpenses();
    const exp = expenses.find(e => e.id === id);
    if (!exp) return;

    document.getElementById("modalExpenseTitle").textContent = "Edit Expense";
    document.getElementById("expFormId").value = exp.id;
    document.getElementById("expFormCategory").value = exp.category;
    document.getElementById("expFormAmount").value = exp.amount;
    document.getElementById("expFormDate").value = exp.date;
    document.getElementById("expFormDesc").value = exp.description;
    document.getElementById("expFormPayment").value = exp.paymentMethod || "UPI";

    this.openModal("modalExpense");
  },

  saveExpenseForm() {
    const id = document.getElementById("expFormId").value;
    const category = document.getElementById("expFormCategory").value;
    const categoryName = document.getElementById("expFormCategory").options[document.getElementById("expFormCategory").selectedIndex].text.replace(/^[^\s]+\s/, "");
    const amount = Number(document.getElementById("expFormAmount").value);
    const date = document.getElementById("expFormDate").value;
    const description = document.getElementById("expFormDesc").value.trim();
    const paymentMethod = document.getElementById("expFormPayment").value;

    if (!amount || amount <= 0) {
      alert("Please enter a valid expense amount.");
      return;
    }

    const payload = {
      category,
      categoryName,
      amount,
      date,
      description,
      paymentMethod
    };

    if (id) {
      StorageService.updateExpense(id, payload);
      this.showToast("Expense updated successfully!", "success");
    } else {
      StorageService.addExpense(payload);
      this.showToast("New expense logged successfully!", "success");
    }

    this.closeModal("modalExpense");
    this.refreshAllData();
  },

  deleteExpensePrompt(id) {
    if (confirm("Are you sure you want to delete this expense record?")) {
      StorageService.deleteExpense(id);
      this.refreshAllData();
      this.showToast("Expense deleted.", "info");
    }
  },

  exportExpensesCSV() {
    const expenses = StorageService.getExpenses();
    if (expenses.length === 0) {
      alert("No expenses available to export.");
      return;
    }

    const headers = ["ID", "Date", "Category", "Description", "Amount (INR)", "Payment Method"];
    const rows = expenses.map(e => [
      `"${e.id}"`,
      `"${e.date}"`,
      `"${e.categoryName || e.category}"`,
      `"${(e.description || '').replace(/"/g, '""')}"`,
      e.amount,
      `"${e.paymentMethod || 'UPI'}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SmartFin_Expenses_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.showToast("Expenses exported to CSV successfully!", "success");
  },

  // ================= SAVINGS GOALS =================
  renderGoals() {
    const goals = StorageService.getGoals();
    const container = document.getElementById("goalsContainer");
    if (!container) return;

    if (goals.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px; background: white; border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
          <div style="font-size: 36px; margin-bottom: 12px;">🎯</div>
          <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 6px;">No Savings Goals Created</h4>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">Create your first goal for Emergency Funds, Children's Education, or Home.</p>
          <button class="btn btn-primary btn-sm" onclick="App.openAddGoalModal()">Create Goal</button>
        </div>
      `;
      return;
    }

    container.innerHTML = goals.map(g => {
      const target = Number(g.targetAmount) || 1;
      const current = Number(g.currentAmount) || 0;
      const pct = Math.min(100, Math.round((current / target) * 100));
      const remaining = Math.max(0, target - current);
      const isCompleted = current >= target;

      return `
        <div class="goal-card">
          <div class="goal-header">
            <div class="goal-icon">${g.icon || "🎯"}</div>
            <div class="goal-title-wrap">
              <div class="goal-title">${g.title}</div>
              <div class="goal-category-tag">${g.category}</div>
            </div>
          </div>

          <div class="goal-amount-row">
            <div class="goal-current">₹${current.toLocaleString("en-IN")}</div>
            <div class="goal-target">of ₹${target.toLocaleString("en-IN")}</div>
          </div>

          <div class="goal-progress-wrap">
            <div class="goal-progress-bar" style="width: ${pct}%;"></div>
          </div>

          <div class="goal-details-grid">
            <div>
              <div class="goal-detail-label">Remaining</div>
              <div class="goal-detail-val">₹${remaining.toLocaleString("en-IN")}</div>
            </div>
            <div>
              <div class="goal-detail-label">Progress</div>
              <div class="goal-detail-val" style="color: ${isCompleted ? '#10b981' : 'var(--primary)'}; font-weight: 700;">
                ${pct}% ${isCompleted ? '🎉 Goal Reached!' : ''}
              </div>
            </div>
            <div>
              <div class="goal-detail-label">Target Date</div>
              <div class="goal-detail-val">${g.targetDate || 'Flexible'}</div>
            </div>
            <div>
              <div class="goal-detail-label">Monthly Target</div>
              <div class="goal-detail-val">₹${(Number(g.monthlyContribution) || 0).toLocaleString("en-IN")}</div>
            </div>
          </div>

          <div class="goal-actions">
            <button class="btn btn-outline-primary btn-sm" style="flex: 1;" onclick="App.openAddFundsModal('${g.id}', '${g.title.replace(/'/g, "\\'")}')">
              <i class="fa-solid fa-plus"></i> Add Money
            </button>
            <button class="btn btn-secondary btn-sm" onclick="App.openEditGoalModal('${g.id}')" title="Edit">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn btn-secondary btn-sm" onclick="App.deleteGoalPrompt('${g.id}')" title="Delete" style="color: #ef4444;">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `;
    }).join("");
  },

  openAddGoalModal() {
    document.getElementById("modalGoalTitle").textContent = "Create New Savings Goal";
    document.getElementById("goalFormId").value = "";
    document.getElementById("goalFormTitle").value = "";
    document.getElementById("goalFormCategory").value = "Emergency fund";
    document.getElementById("goalFormTarget").value = "";
    document.getElementById("goalFormCurrent").value = "0";
    document.getElementById("goalFormTargetDate").value = "";
    document.getElementById("goalFormMonthly").value = "";
    this.openModal("modalGoal");
  },

  openEditGoalModal(id) {
    const goals = StorageService.getGoals();
    const g = goals.find(item => item.id === id);
    if (!g) return;

    document.getElementById("modalGoalTitle").textContent = "Edit Savings Goal";
    document.getElementById("goalFormId").value = g.id;
    document.getElementById("goalFormTitle").value = g.title;
    document.getElementById("goalFormCategory").value = g.category;
    document.getElementById("goalFormTarget").value = g.targetAmount;
    document.getElementById("goalFormCurrent").value = g.currentAmount;
    document.getElementById("goalFormTargetDate").value = g.targetDate || "";
    document.getElementById("goalFormMonthly").value = g.monthlyContribution || "";

    this.openModal("modalGoal");
  },

  saveGoalForm() {
    const id = document.getElementById("goalFormId").value;
    const title = document.getElementById("goalFormTitle").value.trim();
    const category = document.getElementById("goalFormCategory").value;
    const targetAmount = Number(document.getElementById("goalFormTarget").value);
    const currentAmount = Number(document.getElementById("goalFormCurrent").value) || 0;
    const targetDate = document.getElementById("goalFormTargetDate").value;
    const monthlyContribution = Number(document.getElementById("goalFormMonthly").value) || 0;

    const iconMap = {
      "Emergency fund": "🛡️",
      "Education": "🎓",
      "Laptop": "💻",
      "Bike": "🛵",
      "House": "🏠",
      "Business": "🚀",
      "Other": "🎯"
    };

    const payload = {
      title,
      category,
      icon: iconMap[category] || "🎯",
      targetAmount,
      currentAmount,
      targetDate,
      monthlyContribution
    };

    if (id) {
      StorageService.updateGoal(id, payload);
      this.showToast("Savings goal updated!", "success");
    } else {
      StorageService.addGoal(payload);
      this.showToast("New savings goal created!", "success");
    }

    this.closeModal("modalGoal");
    this.refreshAllData();
  },

  openAddFundsModal(id, title) {
    document.getElementById("fundsGoalId").value = id;
    document.getElementById("fundsGoalNameText").textContent = `Adding funds to: ${title}`;
    document.getElementById("fundsAddAmount").value = "";
    this.openModal("modalAddFunds");
  },

  confirmAddFunds() {
    const id = document.getElementById("fundsGoalId").value;
    const amt = Number(document.getElementById("fundsAddAmount").value);
    if (!amt || amt <= 0) return;

    const updated = StorageService.addFundsToGoal(id, amt);
    this.closeModal("modalAddFunds");
    this.refreshAllData();

    if (updated && updated.currentAmount >= updated.targetAmount) {
      this.showToast(`🎉 Congratulations! You reached your goal: ${updated.title}!`, "success");
    } else {
      this.showToast(`Added ₹${amt.toLocaleString("en-IN")} to your goal!`, "success");
    }
  },

  deleteGoalPrompt(id) {
    if (confirm("Delete this savings goal?")) {
      StorageService.deleteGoal(id);
      this.refreshAllData();
      this.showToast("Goal removed.", "info");
    }
  },

  // ================= KARNATAKA GOVERNMENT SCHEME FINDER ⭐ =================
  runEligibilityEvaluation() {
    // Read input profile from the wizard
    const profile = {
      age: Number(document.getElementById("finderAge")?.value) || 28,
      gender: document.getElementById("finderGender")?.value || "Male",
      district: document.getElementById("finderDistrict")?.value || "Mysuru",
      annualIncome: Number(document.getElementById("finderAnnualIncome")?.value) || 360000,
      occupation: document.getElementById("finderOccupation")?.value || "Private Employee",
      employmentStatus: document.getElementById("finderEmploymentStatus")?.value || "Employed",
      education: document.getElementById("finderEducation")?.value || "Graduate",
      farmerStatus: document.getElementById("finderFarmerStatus")?.value || "Non-Farmer",
      rationCardType: document.getElementById("finderRationCard")?.value || "APL",
      disabilityStatus: document.getElementById("finderDisability")?.checked ? "Yes" : "No",
      taxPayer: Boolean(document.getElementById("finderTaxPayer")?.checked),
      hasGirlChildUnder10: Boolean(document.getElementById("finderGirlChild")?.checked),
      state: "Karnataka"
    };

    const results = EligibilityEngine.evaluateAllSchemes(profile, SCHEMES_DATABASE);

    // Update Counts
    const likelyCount = results.filter(r => r.status === "likely").length;
    const maybeCount = results.filter(r => r.status === "maybe").length;
    const unlikelyCount = results.filter(r => r.status === "unlikely").length;

    const statLikely = document.getElementById("statLikelyCount");
    const statMaybe = document.getElementById("statMaybeCount");
    const statUnlikely = document.getElementById("statUnlikelyCount");
    const statTotal = document.getElementById("statTotalCount");

    if (statLikely) statLikely.textContent = likelyCount;
    if (statMaybe) statMaybe.textContent = maybeCount;
    if (statUnlikely) statUnlikely.textContent = unlikelyCount;
    if (statTotal) statTotal.textContent = results.length;

    // Filter by active pill
    let displayed = results;
    if (this.activeStatusFilter !== "all") {
      displayed = results.filter(r => r.status === this.activeStatusFilter);
    }

    const container = document.getElementById("evaluatedSchemesContainer");
    if (!container) return;

    if (displayed.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px; background: white; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <p style="font-size: 15px; color: var(--text-muted);">No schemes found matching the selected status filter.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = displayed.map(item => this.renderSchemeCardHTML(item)).join("");
  },

  filterEvaluatedByStatus(status) {
    this.activeStatusFilter = status;

    // Toggle active state on pills
    document.querySelectorAll(".stat-pill").forEach(p => p.classList.remove("active"));
    const map = {
      likely: "pillFilterLikely",
      maybe: "pillFilterMaybe",
      unlikely: "pillFilterUnlikely",
      all: "pillFilterAll"
    };
    const activePill = document.getElementById(map[status]);
    if (activePill) activePill.classList.add("active");

    this.runEligibilityEvaluation();
  },

  renderSchemeCardHTML(evaluationItem) {
    const s = evaluationItem.scheme;
    const badge = evaluationItem.badge;
    const badgeClass = evaluationItem.badgeClass;
    const borderClass = `border-${evaluationItem.status}`;

    return `
      <div class="scheme-card ${borderClass}">
        <div class="scheme-top-row">
          <div class="scheme-title-area">
            <h4>${s.name}</h4>
            <div class="scheme-kannada-title">${s.kannadaName || ''}</div>
            <div class="scheme-dept-tag">
              <i class="fa-solid fa-building-columns"></i>
              ${s.department} • <span class="scheme-category-badge">${s.level}</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
            <span class="badge-eligibility ${badgeClass}">${badge}</span>
            <span style="font-size: 11px; color: var(--text-muted); font-weight: 600;">Match: ${evaluationItem.matchPercentage}%</span>
          </div>
        </div>

        <div class="scheme-meta-box">
          <div class="meta-row">
            <span class="meta-title">Who can apply:</span>
            <span class="meta-content">${s.whoCanApply}</span>
          </div>

          <div class="meta-row">
            <span class="meta-title">Key Benefits:</span>
            <div class="meta-content">
              <ul class="scheme-benefits-list">
                ${s.benefits.slice(0, 2).map(b => `<li>${b}</li>`).join("")}
              </ul>
            </div>
          </div>

          <div class="meta-row">
            <span class="meta-title">Required Documents:</span>
            <div class="meta-content">
              <ul class="scheme-docs-list">
                ${s.requiredDocuments.slice(0, 3).map(d => `<li>${d}</li>`).join("")}
              </ul>
            </div>
          </div>
        </div>

        <!-- Criteria Match Breakdown -->
        <div style="font-size: 12px; margin-bottom: 12px;">
          ${evaluationItem.matched.length > 0 ? `
            <div style="color: #059669; margin-bottom: 4px;">
              <strong>Matches:</strong> ${evaluationItem.matched.join(" • ")}
            </div>
          ` : ''}
          ${evaluationItem.missing.length > 0 ? `
            <div style="color: #dc2626;">
              <strong>Verification needed:</strong> ${evaluationItem.missing.join(" • ")}
            </div>
          ` : ''}
        </div>

        <div class="scheme-bottom-row">
          <div class="scheme-source-text">
            <span>Official Portal: <strong>${s.portalName}</strong></span>
            <span>Source: ${s.sourceName} • Verified: ${s.lastVerifiedDate}</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-sm" onclick="App.openSchemeDetailsModal('${s.id}')">
              <i class="fa-solid fa-circle-info"></i> Full Details
            </button>
            <a href="${s.officialWebsite}" target="_blank" rel="noopener noreferrer" class="official-visit-btn">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Visit Official Website
            </a>
          </div>
        </div>
      </div>
    `;
  },

  // ================= SCHEMES DIRECTORY VIEW =================
  renderSchemesDirectory() {
    const searchVal = (document.getElementById("directorySearchInput")?.value || "").toLowerCase().trim();
    const levelVal = document.getElementById("directoryLevelFilter")?.value || "all";
    const profile = StorageService.getProfile();

    const evaluated = EligibilityEngine.evaluateAllSchemes(profile, SCHEMES_DATABASE);

    const filtered = evaluated.filter(item => {
      const s = item.scheme;
      // Category filter
      if (this.activeCategoryFilter !== "all" && s.category !== this.activeCategoryFilter) return false;

      // Level filter
      if (levelVal === "karnataka" && s.level !== "Karnataka State") return false;
      if (levelVal === "central" && s.level !== "Government of India") return false;

      // Search keyword
      if (searchVal) {
        const text = `${s.name} ${s.kannadaName || ''} ${s.department} ${s.whoCanApply} ${(s.tags || []).join(' ')}`.toLowerCase();
        if (!text.includes(searchVal)) return false;
      }
      return true;
    });

    const container = document.getElementById("directorySchemesContainer");
    if (!container) return;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 48px; background: white; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
          <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 6px;">No Government Schemes Found</h4>
          <p style="font-size: 13px; color: var(--text-muted);">Try clearing your search query or selecting another category.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(item => this.renderSchemeCardHTML(item)).join("");
  },

  openSchemeDetailsModal(schemeId) {
    const scheme = SCHEMES_DATABASE.find(s => s.id === schemeId);
    if (!scheme) return;

    document.getElementById("schemeModalName").textContent = scheme.name;
    document.getElementById("schemeModalKannada").textContent = scheme.kannadaName || "";
    document.getElementById("schemeModalVerified").textContent = `Source: ${scheme.sourceName} • Last verified: ${scheme.lastVerifiedDate}`;
    document.getElementById("schemeModalOfficialBtn").setAttribute("href", scheme.officialWebsite);

    const bodyEl = document.getElementById("schemeModalBody");
    bodyEl.innerHTML = `
      <div style="margin-bottom: 16px;">
        <span class="scheme-category-badge" style="background:#eff6ff; color:#2563eb;">${scheme.level}</span>
        <span class="scheme-category-badge" style="margin-left: 6px;">${scheme.category}</span>
        <div style="font-size: 13px; color: var(--slate-600); margin-top: 6px;">
          <strong>Department:</strong> ${scheme.department}
        </div>
      </div>

      <div class="card" style="margin-bottom: 16px; background: var(--slate-50);">
        <h5 style="font-size: 14px; font-weight: 700; margin-bottom: 6px;">Who Can Apply?</h5>
        <p style="font-size: 13px; color: var(--slate-700);">${scheme.whoCanApply}</p>
      </div>

      <div style="margin-bottom: 16px;">
        <h5 style="font-size: 14px; font-weight: 700; margin-bottom: 8px; color: var(--slate-900);">Detailed Eligibility Requirements:</h5>
        <ul style="padding-left: 20px; font-size: 13px; color: var(--slate-700); line-height: 1.6;">
          ${scheme.eligibilityCriteria.map(c => `<li>${c}</li>`).join("")}
        </ul>
      </div>

      <div style="margin-bottom: 16px;">
        <h5 style="font-size: 14px; font-weight: 700; margin-bottom: 8px; color: #059669;">Financial & Program Benefits:</h5>
        <ul style="padding-left: 20px; font-size: 13px; color: var(--slate-700); line-height: 1.6;">
          ${scheme.benefits.map(b => `<li>${b}</li>`).join("")}
        </ul>
      </div>

      <div style="margin-bottom: 16px;">
        <h5 style="font-size: 14px; font-weight: 700; margin-bottom: 8px; color: var(--primary);">Required Documents for Application:</h5>
        <ul style="padding-left: 20px; font-size: 13px; color: var(--slate-700); line-height: 1.6;">
          ${scheme.requiredDocuments.map(d => `<li>${d}</li>`).join("")}
        </ul>
      </div>

      <div style="margin-bottom: 16px;">
        <h5 style="font-size: 14px; font-weight: 700; margin-bottom: 8px; color: var(--slate-900);">Step-by-Step Application Process:</h5>
        <ol style="padding-left: 20px; font-size: 13px; color: var(--slate-700); line-height: 1.6;">
          ${scheme.applicationProcess.map(step => `<li>${step}</li>`).join("")}
        </ol>
      </div>

      <div class="disclaimer-banner" style="margin-top: 20px;">
        <i class="fa-solid fa-shield-halved" style="font-size: 18px;"></i>
        <div>
          Official information sourced directly from Karnataka Government and Government of India portals. 
          Applications are submitted exclusively through official channels such as Seva Sindhu, Grama One, or the official scheme portal.
        </div>
      </div>
    `;

    this.openModal("modalSchemeDetails");
  },

  // ================= FINANCIAL LITERACY MODULES =================
  renderLiteracyModules() {
    const container = document.getElementById("literacyModulesContainer");
    if (!container) return;

    container.innerHTML = LITERACY_MODULES.map(m => `
      <div class="literacy-card" onclick="App.openLiteracyModal('${m.id}')">
        <div class="literacy-card-header">
          <div class="literacy-icon-box">${m.icon}</div>
          <span class="read-time-tag">${m.readTime}</span>
        </div>
        <div class="literacy-title">${m.title}</div>
        <div class="literacy-kannada-title">${m.kannadaTitle || ''}</div>
        <div class="literacy-summary">${m.summary}</div>
        <div class="literacy-action-btn">
          <span>Read Guide & Quiz</span>
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    `).join("");
  },

  openLiteracyModal(moduleId) {
    const mod = LITERACY_MODULES.find(m => m.id === moduleId);
    if (!mod) return;

    document.getElementById("litModalTitle").textContent = `${mod.icon} ${mod.title}`;
    document.getElementById("litModalKannada").textContent = mod.kannadaTitle || "";

    const bodyEl = document.getElementById("litModalBody");
    bodyEl.innerHTML = `
      <div style="margin-bottom: 18px; line-height: 1.6; font-size: 14px; color: var(--slate-700);">
        ${mod.detailedContent}
      </div>

      <div class="card" style="background: #f0fdf4; border-color: #bbf7d0; margin-bottom: 24px;">
        <div style="font-weight: 700; color: #166534; font-size: 13px; margin-bottom: 4px;">
          <i class="fa-solid fa-lightbulb"></i> Practical Action Tip:
        </div>
        <div style="font-size: 13px; color: #14532d;">${mod.actionTip}</div>
      </div>

      <!-- Interactive Quiz -->
      <div class="card" style="border: 2px solid var(--primary-light);">
        <div class="card-header">
          <div class="card-title" style="font-size: 15px;">
            <i class="fa-solid fa-circle-question" style="color: var(--primary);"></i> Knowledge Check / Quiz
          </div>
        </div>
        <p style="font-size: 14px; font-weight: 600; margin-bottom: 14px; color: var(--slate-900);">
          ${mod.quiz.question}
        </p>
        <div style="display: flex; flex-direction: column; gap: 8px;" id="quizOptionsList">
          ${mod.quiz.options.map((opt, idx) => `
            <button class="btn btn-secondary" style="text-align: left; justify-content: flex-start; padding: 10px 14px;" 
              onclick="App.checkQuizAnswer(${idx}, ${mod.quiz.correctIndex}, '${mod.quiz.explanation.replace(/'/g, "\\'")}')">
              ${opt}
            </button>
          `).join("")}
        </div>
        <div id="quizResultBox" style="margin-top: 14px; display: none;"></div>
      </div>
    `;

    this.openModal("modalLiteracyReader");
  },

  checkQuizAnswer(selectedIndex, correctIndex, explanation) {
    const resultBox = document.getElementById("quizResultBox");
    if (!resultBox) return;

    resultBox.style.display = "block";
    if (selectedIndex === correctIndex) {
      resultBox.innerHTML = `
        <div style="padding: 12px; background: #d1fae5; border-radius: var(--radius-md); color: #065f46; font-size: 13px;">
          <strong><i class="fa-solid fa-circle-check"></i> Correct Answer!</strong><br>
          ${explanation}
        </div>
      `;
    } else {
      resultBox.innerHTML = `
        <div style="padding: 12px; background: #fee2e2; border-radius: var(--radius-md); color: #991b1b; font-size: 13px;">
          <strong><i class="fa-solid fa-circle-xmark"></i> Incorrect. Try again!</strong><br>
          ${explanation}
        </div>
      `;
    }
  },

  // ================= INTERACTIVE CALCULATORS =================
  openCalculatorsModal() {
    this.openModal("modalCalculators");
    this.calculateEmi();
    this.calculateSip();
    this.calculateEmergency();
  },

  switchCalcTab(tabKey) {
    document.querySelectorAll(".calc-tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".calc-content-tab").forEach(t => t.style.display = "none");

    const tabs = {
      emi: { btnIdx: 0, tabId: "calcTabEmi" },
      sip: { btnIdx: 1, tabId: "calcTabSip" },
      emergency: { btnIdx: 2, tabId: "calcTabEmergency" }
    };

    const target = tabs[tabKey];
    if (target) {
      const btn = document.querySelectorAll(".calc-tab-btn")[target.btnIdx];
      if (btn) btn.classList.add("active");
      const tabEl = document.getElementById(target.tabId);
      if (tabEl) tabEl.style.display = "block";
    }
  },

  calculateEmi() {
    const P = Number(document.getElementById("emiLoanAmount")?.value) || 300000;
    const annualRate = Number(document.getElementById("emiInterestRate")?.value) || 9.5;
    const years = Number(document.getElementById("emiTenureYears")?.value) || 3;

    const r = (annualRate / 12) / 100;
    const n = years * 12;

    const emi = Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;

    const resMonthly = document.getElementById("emiResultMonthly");
    const resInterest = document.getElementById("emiResultInterest");
    const resTotal = document.getElementById("emiResultTotal");

    if (resMonthly) resMonthly.textContent = `₹${emi.toLocaleString("en-IN")}`;
    if (resInterest) resInterest.textContent = `₹${totalInterest.toLocaleString("en-IN")}`;
    if (resTotal) resTotal.textContent = `₹${totalAmount.toLocaleString("en-IN")}`;
  },

  calculateSip() {
    const P = Number(document.getElementById("sipMonthlyAmount")?.value) || 3000;
    const annualRate = Number(document.getElementById("sipReturnRate")?.value) || 8.0;
    const years = Number(document.getElementById("sipYears")?.value) || 5;

    const i = (annualRate / 12) / 100;
    const n = years * 12;

    const totalInvested = P * n;
    const maturityValue = Math.round(P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    const returns = maturityValue - totalInvested;

    const resInv = document.getElementById("sipResultInvested");
    const resRet = document.getElementById("sipResultReturns");
    const resTot = document.getElementById("sipResultTotal");

    if (resInv) resInv.textContent = `₹${totalInvested.toLocaleString("en-IN")}`;
    if (resRet) resRet.textContent = `₹${returns.toLocaleString("en-IN")}`;
    if (resTot) resTot.textContent = `₹${maturityValue.toLocaleString("en-IN")}`;
  },

  calculateEmergency() {
    const cost = Number(document.getElementById("emgMonthlyCost")?.value) || 20000;
    const months = Number(document.getElementById("emgMonthsCount")?.value) || 6;

    const target = cost * months;
    const resEl = document.getElementById("emgTargetResult");
    if (resEl) resEl.textContent = `₹${target.toLocaleString("en-IN")}`;
  },

  // ================= SMART INSIGHTS =================
  renderSmartInsights() {
    const profile = StorageService.getProfile();
    const budgets = StorageService.getBudgets();
    const expenses = StorageService.getExpenses();
    const goals = StorageService.getGoals();

    const summary = InsightsEngine.calculateFinancialSummary(profile, budgets, expenses, goals);
    const evaluatedSchemes = EligibilityEngine.evaluateAllSchemes(profile, SCHEMES_DATABASE);
    const insights = InsightsEngine.generateInsights(summary, profile, budgets, goals, evaluatedSchemes);

    const container = document.getElementById("insightsListContainer");
    if (!container) return;

    container.innerHTML = insights.map(ins => `
      <div class="insight-card card-${ins.type}">
        <div class="insight-icon-box">${ins.icon}</div>
        <div class="insight-content">
          <div class="insight-title">${ins.title}</div>
          <div class="insight-message">${ins.message}</div>
          <div class="insight-action-text">
            <i class="fa-solid fa-arrow-right"></i>
            <span>${ins.actionText}</span>
          </div>
        </div>
      </div>
    `).join("");
  },

  // ================= DATA BACKUP & RESTORE =================
  downloadJSONBackup() {
    const data = StorageService.exportAllData();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `SmartFin_Backup_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    this.showToast("Backup JSON file downloaded successfully!", "success");
  },

  handleImportFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const res = StorageService.importData(e.target.result);
      if (res.success) {
        this.loadProfileIntoForms();
        this.refreshAllData();
        this.showToast("Data restored from JSON backup successfully!", "success");
      } else {
        alert("Failed to import data: " + res.error);
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  },

  // ================= MODAL HELPERS =================
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("active-modal");
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("active-modal");
  },

  // ================= UTILITIES =================
  getCategoryIcon(catId) {
    const icons = {
      food: "🍛",
      rent: "🏠",
      education: "📚",
      transport: "🛵",
      electricity: "⚡",
      healthcare: "💊",
      entertainment: "🍿",
      shopping: "🛍️",
      other: "📦"
    };
    return icons[catId] || "📦";
  },

  showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : type === 'error' ? '⚠' : 'ℹ'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(50px)";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
};

// Start application when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
