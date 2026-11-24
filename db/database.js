/**
 * SmartFin - Database Management Layer
 * Uses Node.js native SQLite (node:sqlite DatabaseSync) with auto-migrations and seeding.
 */

const path = require("path");
const fs = require("fs");

let dbInstance = null;
const DB_FILE_PATH = path.join(__dirname, "smartfin.db");

// Default initial data for Karnataka Citizen
const DEFAULT_PROFILE = {
  name: "Anand Kumar",
  phone: "9845012345",
  age: 29,
  gender: "Male",
  district: "Mysuru",
  state: "Karnataka",
  monthly_income: 30000,
  annual_income: 360000,
  occupation: "Private Employee",
  employment_status: "Employed",
  education: "Graduate",
  farmer_status: "Non-Farmer",
  ration_card_type: "APL",
  disability_status: "No",
  tax_payer: 0,
  has_girl_child: 1
};

const DEFAULT_BUDGETS = [
  { id: "food", name: "Food & Groceries", icon: "🍛", budgeted: 8000, type: "need", color: "#10b981" },
  { id: "rent", name: "Rent & Housing", icon: "🏠", budgeted: 7000, type: "need", color: "#3b82f6" },
  { id: "education", name: "Education & Fees", icon: "📚", budgeted: 2500, type: "need", color: "#6366f1" },
  { id: "transport", name: "Transport & Fuel", icon: "🛵", budgeted: 2000, type: "need", color: "#f59e0b" },
  { id: "electricity", name: "Electricity & Bills", icon: "⚡", budgeted: 1200, type: "need", color: "#eab308" },
  { id: "healthcare", name: "Healthcare & Medicine", icon: "💊", budgeted: 1500, type: "need", color: "#ec4899" },
  { id: "entertainment", name: "Entertainment & Outings", icon: "🍿", budgeted: 1200, type: "want", color: "#8b5cf6" },
  { id: "shopping", name: "Shopping & Clothes", icon: "🛍️", budgeted: 1500, type: "want", color: "#14b8a6" },
  { id: "other", name: "Other Expenses", icon: "📦", budgeted: 1000, type: "want", color: "#64748b" }
];

const DEFAULT_GOALS = [
  {
    id: "goal-1",
    title: "Emergency Fund (3 Months)",
    category: "Emergency fund",
    icon: "🛡️",
    target_amount: 60000,
    current_amount: 28000,
    target_date: "2027-06-30",
    monthly_contribution: 4000,
    notes: "Kept in high-interest sweep-in bank account"
  },
  {
    id: "goal-2",
    title: "Daughter's Education (Sukanya Samriddhi)",
    category: "Education",
    icon: "🎓",
    target_amount: 250000,
    current_amount: 75000,
    target_date: "2032-12-31",
    monthly_contribution: 2500,
    notes: "Post Office SSY account earning 8.2% tax-free"
  },
  {
    id: "goal-3",
    title: "Electric Two-Wheeler (EV Scooter)",
    category: "Bike",
    icon: "🛵",
    target_amount: 90000,
    current_amount: 36000,
    target_date: "2027-10-31",
    monthly_contribution: 3500,
    notes: "Save fuel costs for daily commute"
  }
];

const DEFAULT_EXPENSES = [
  {
    id: "exp-1",
    category: "food",
    category_name: "Food & Groceries",
    amount: 3200,
    date: new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0],
    description: "Monthly rice, daal, oil from local provision store",
    payment_method: "UPI"
  },
  {
    id: "exp-2",
    category: "rent",
    category_name: "Rent & Housing",
    amount: 7000,
    date: new Date(Date.now() - 20 * 86400000).toISOString().split("T")[0],
    description: "House rent for 2BHK Mysuru",
    payment_method: "Bank Transfer"
  },
  {
    id: "exp-3",
    category: "food",
    category_name: "Food & Groceries",
    amount: 1450,
    date: new Date(Date.now() - 12 * 86400000).toISOString().split("T")[0],
    description: "Vegetables and fruits from HOPCOMS market",
    payment_method: "Cash"
  },
  {
    id: "exp-4",
    category: "transport",
    category_name: "Transport & Fuel",
    amount: 1200,
    date: new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0],
    description: "Two-wheeler petrol at Indian Oil pump",
    payment_method: "UPI"
  },
  {
    id: "exp-5",
    category: "electricity",
    category_name: "Electricity & Bills",
    amount: 450,
    date: new Date(Date.now() - 15 * 86400000).toISOString().split("T")[0],
    description: "CESC Electricity bill (subsidized by Gruha Jyothi)",
    payment_method: "UPI"
  },
  {
    id: "exp-6",
    category: "education",
    category_name: "Education & Fees",
    amount: 2200,
    date: new Date(Date.now() - 18 * 86400000).toISOString().split("T")[0],
    description: "School books and tuition fee installment",
    payment_method: "UPI"
  },
  {
    id: "exp-7",
    category: "healthcare",
    category_name: "Healthcare & Medicine",
    amount: 850,
    date: new Date(Date.now() - 9 * 86400000).toISOString().split("T")[0],
    description: "Routine health checkup & pharmacy medicines",
    payment_method: "UPI"
  },
  {
    id: "exp-8",
    category: "shopping",
    category_name: "Shopping & Clothes",
    amount: 1300,
    date: new Date(Date.now() - 4 * 86400000).toISOString().split("T")[0],
    description: "New footwear and shirts",
    payment_method: "Card"
  },
  {
    id: "exp-9",
    category: "entertainment",
    category_name: "Entertainment & Outings",
    amount: 950,
    date: new Date(Date.now() - 5 * 86400000).toISOString().split("T")[0],
    description: "Family dinner at Udupi Veg restaurant",
    payment_method: "UPI"
  },
  {
    id: "exp-10",
    category: "food",
    category_name: "Food & Groceries",
    amount: 900,
    date: new Date(Date.now() - 1 * 86400000).toISOString().split("T")[0],
    description: "Weekly dairy, Nandini milk & curd",
    payment_method: "UPI"
  },
  {
    id: "exp-11",
    category: "other",
    category_name: "Other Expenses",
    amount: 500,
    date: new Date(Date.now() - 8 * 86400000).toISOString().split("T")[0],
    description: "Mobile recharge (Airtel & Jio packs)",
    payment_method: "UPI"
  }
];

function initDatabase() {
  if (dbInstance) return dbInstance;

  try {
    const { DatabaseSync } = require("node:sqlite");
    const db = new DatabaseSync(DB_FILE_PATH);

    // 1. Create tables
    db.exec(`
      CREATE TABLE IF NOT EXISTS profile (
        id INTEGER PRIMARY KEY DEFAULT 1,
        name TEXT,
        phone TEXT,
        age INTEGER,
        gender TEXT,
        district TEXT,
        state TEXT,
        monthly_income REAL,
        annual_income REAL,
        occupation TEXT,
        employment_status TEXT,
        education TEXT,
        farmer_status TEXT,
        ration_card_type TEXT,
        disability_status TEXT,
        tax_payer INTEGER,
        has_girl_child INTEGER,
        updated_at TEXT
      );

      CREATE TABLE IF NOT EXISTS budgets (
        id TEXT PRIMARY KEY,
        name TEXT,
        icon TEXT,
        budgeted REAL,
        type TEXT,
        color TEXT
      );

      CREATE TABLE IF NOT EXISTS expenses (
        id TEXT PRIMARY KEY,
        category TEXT,
        category_name TEXT,
        amount REAL,
        date TEXT,
        description TEXT,
        payment_method TEXT,
        created_at TEXT
      );

      CREATE TABLE IF NOT EXISTS goals (
        id TEXT PRIMARY KEY,
        title TEXT,
        category TEXT,
        icon TEXT,
        target_amount REAL,
        current_amount REAL,
        target_date TEXT,
        monthly_contribution REAL,
        notes TEXT,
        created_at TEXT
      );
    `);

    // 2. Check and seed initial data if tables are empty
    const profileRow = db.prepare("SELECT * FROM profile WHERE id = 1").get();
    if (!profileRow) {
      const p = DEFAULT_PROFILE;
      db.prepare(`
        INSERT INTO profile (id, name, phone, age, gender, district, state, monthly_income, annual_income, occupation, employment_status, education, farmer_status, ration_card_type, disability_status, tax_payer, has_girl_child, updated_at)
        VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        p.name, p.phone, p.age, p.gender, p.district, p.state, p.monthly_income, p.annual_income,
        p.occupation, p.employment_status, p.education, p.farmer_status, p.ration_card_type,
        p.disability_status, p.tax_payer, p.has_girl_child, new Date().toISOString()
      );

      // Seed budgets
      const insertBudget = db.prepare("INSERT INTO budgets (id, name, icon, budgeted, type, color) VALUES (?, ?, ?, ?, ?, ?)");
      DEFAULT_BUDGETS.forEach(b => {
        insertBudget.run(b.id, b.name, b.icon, b.budgeted, b.type, b.color);
      });

      // Seed goals
      const insertGoal = db.prepare("INSERT INTO goals (id, title, category, icon, target_amount, current_amount, target_date, monthly_contribution, notes, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
      DEFAULT_GOALS.forEach(g => {
        insertGoal.run(g.id, g.title, g.category, g.icon, g.target_amount, g.current_amount, g.target_date, g.monthly_contribution, g.notes, new Date().toISOString());
      });

      // Seed expenses
      const insertExpense = db.prepare("INSERT INTO expenses (id, category, category_name, amount, date, description, payment_method, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
      DEFAULT_EXPENSES.forEach(e => {
        insertExpense.run(e.id, e.category, e.category_name, e.amount, e.date, e.description, e.payment_method, new Date().toISOString());
      });

      console.log("Database initialized and seeded with Karnataka citizen starter data.");
    }

    dbInstance = {
      type: "sqlite",
      // Profile
      getProfile() {
        const row = db.prepare("SELECT * FROM profile WHERE id = 1").get();
        if (!row) return DEFAULT_PROFILE;
        return {
          name: row.name,
          phone: row.phone,
          age: row.age,
          gender: row.gender,
          district: row.district,
          state: row.state,
          monthlyIncome: row.monthly_income,
          annualIncome: row.annual_income,
          occupation: row.occupation,
          employmentStatus: row.employment_status,
          education: row.education,
          farmerStatus: row.farmer_status,
          rationCardType: row.ration_card_type,
          disabilityStatus: row.disability_status,
          taxPayer: Boolean(row.tax_payer),
          hasGirlChildUnder10: Boolean(row.has_girl_child)
        };
      },
      updateProfile(p) {
        db.prepare(`
          UPDATE profile SET
            name = ?, phone = ?, age = ?, gender = ?, district = ?, state = ?,
            monthly_income = ?, annual_income = ?, occupation = ?, employment_status = ?,
            education = ?, farmer_status = ?, ration_card_type = ?, disability_status = ?,
            tax_payer = ?, has_girl_child = ?, updated_at = ?
          WHERE id = 1
        `).run(
          p.name, p.phone || "", p.age, p.gender, p.district, p.state || "Karnataka",
          p.monthlyIncome, p.annualIncome, p.occupation, p.employmentStatus,
          p.education, p.farmerStatus, p.rationCardType, p.disabilityStatus,
          p.taxPayer ? 1 : 0, p.hasGirlChildUnder10 ? 1 : 0, new Date().toISOString()
        );
        return this.getProfile();
      },

      // Budgets
      getBudgets() {
        return db.prepare("SELECT * FROM budgets").all();
      },
      updateBudgets(budgetsList) {
        const updateStmt = db.prepare("UPDATE budgets SET budgeted = ? WHERE id = ?");
        budgetsList.forEach(b => {
          updateStmt.run(b.budgeted, b.id);
        });
        return this.getBudgets();
      },

      // Expenses
      getExpenses() {
        const rows = db.prepare("SELECT * FROM expenses ORDER BY date DESC, created_at DESC").all();
        return rows.map(r => ({
          id: r.id,
          category: r.category,
          categoryName: r.category_name,
          amount: r.amount,
          date: r.date,
          description: r.description,
          paymentMethod: r.payment_method
        }));
      },
      addExpense(e) {
        const id = e.id || "exp-" + Date.now();
        db.prepare(`
          INSERT INTO expenses (id, category, category_name, amount, date, description, payment_method, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          id, e.category, e.categoryName || e.category, e.amount, e.date, e.description, e.paymentMethod || "UPI", new Date().toISOString()
        );
        return { id, ...e };
      },
      updateExpense(id, e) {
        db.prepare(`
          UPDATE expenses SET
            category = ?, category_name = ?, amount = ?, date = ?, description = ?, payment_method = ?
          WHERE id = ?
        `).run(
          e.category, e.categoryName || e.category, e.amount, e.date, e.description, e.paymentMethod || "UPI", id
        );
        return { id, ...e };
      },
      deleteExpense(id) {
        db.prepare("DELETE FROM expenses WHERE id = ?").run(id);
        return { success: true, id };
      },

      // Goals
      getGoals() {
        const rows = db.prepare("SELECT * FROM goals ORDER BY created_at ASC").all();
        return rows.map(r => ({
          id: r.id,
          title: r.title,
          category: r.category,
          icon: r.icon,
          targetAmount: r.target_amount,
          currentAmount: r.current_amount,
          targetDate: r.target_date,
          monthlyContribution: r.monthly_contribution,
          notes: r.notes
        }));
      },
      addGoal(g) {
        const id = g.id || "goal-" + Date.now();
        db.prepare(`
          INSERT INTO goals (id, title, category, icon, target_amount, current_amount, target_date, monthly_contribution, notes, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          id, g.title, g.category, g.icon || "🎯", g.targetAmount, g.currentAmount || 0, g.targetDate || "", g.monthlyContribution || 0, g.notes || "", new Date().toISOString()
        );
        return { id, ...g };
      },
      updateGoal(id, g) {
        db.prepare(`
          UPDATE goals SET
            title = ?, category = ?, icon = ?, target_amount = ?, current_amount = ?, target_date = ?, monthly_contribution = ?, notes = ?
          WHERE id = ?
        `).run(
          g.title, g.category, g.icon || "🎯", g.targetAmount, g.currentAmount, g.targetDate || "", g.monthlyContribution || 0, g.notes || "", id
        );
        return { id, ...g };
      },
      addFundsToGoal(id, amount) {
        db.prepare(`
          UPDATE goals SET current_amount = MIN(target_amount, current_amount + ?) WHERE id = ?
        `).run(amount, id);
        const row = db.prepare("SELECT * FROM goals WHERE id = ?").get(id);
        return row;
      },
      deleteGoal(id) {
        db.prepare("DELETE FROM goals WHERE id = ?").run(id);
        return { success: true, id };
      },

      // Reset
      resetDatabase() {
        db.exec(`
          DELETE FROM expenses;
          DELETE FROM goals;
          DELETE FROM budgets;
          DELETE FROM profile;
        `);
        dbInstance = null;
        return initDatabase();
      }
    };

    return dbInstance;
  } catch (err) {
    console.warn("Native SQLite initialization fallback:", err.message);
    return createMemoryFallback();
  }
}

// Fallback memory / JSON store if node:sqlite is unavailable in strange legacy environments
function createMemoryFallback() {
  let profile = { ...DEFAULT_PROFILE };
  let budgets = [...DEFAULT_BUDGETS];
  let expenses = [...DEFAULT_EXPENSES];
  let goals = [...DEFAULT_GOALS];

  return {
    type: "in-memory",
    getProfile: () => profile,
    updateProfile: (p) => { profile = { ...profile, ...p }; return profile; },
    getBudgets: () => budgets,
    updateBudgets: (bList) => { budgets = bList; return budgets; },
    getExpenses: () => expenses,
    addExpense: (e) => { const item = { id: "exp-" + Date.now(), ...e }; expenses.unshift(item); return item; },
    updateExpense: (id, e) => { const idx = expenses.findIndex(x => x.id === id); if (idx !== -1) expenses[idx] = { ...expenses[idx], ...e }; return expenses[idx]; },
    deleteExpense: (id) => { expenses = expenses.filter(x => x.id !== id); return { success: true }; },
    getGoals: () => goals,
    addGoal: (g) => { const item = { id: "goal-" + Date.now(), ...g }; goals.push(item); return item; },
    updateGoal: (id, g) => { const idx = goals.findIndex(x => x.id === id); if (idx !== -1) goals[idx] = { ...goals[idx], ...g }; return goals[idx]; },
    addFundsToGoal: (id, amount) => { const g = goals.find(x => x.id === id); if (g) g.currentAmount = Math.min(g.targetAmount, g.currentAmount + amount); return g; },
    deleteGoal: (id) => { goals = goals.filter(x => x.id !== id); return { success: true }; },
    resetDatabase: () => { profile = { ...DEFAULT_PROFILE }; budgets = [...DEFAULT_BUDGETS]; expenses = [...DEFAULT_EXPENSES]; goals = [...DEFAULT_GOALS]; }
  };
}

module.exports = { initDatabase };
