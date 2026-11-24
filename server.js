/**
 * SmartFin - Production Ready Express Server & REST API
 * Serves the responsive web application and provides SQLite database REST endpoints.
 */

const express = require("express");
const path = require("path");
const cors = require("cors");
const { initDatabase } = require("./db/database");

const app = express();
const PORT = process.env.PORT || 8085;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize SQLite database
const db = initDatabase();

// ================= REST API ROUTES =================

// 1. Health & Server Status
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    app: "SmartFin – Smart Financial Literacy & Budget Planner",
    tagline: "Plan Better. Save Smarter. Discover Your Benefits.",
    database: db.type,
    timestamp: new Date().toISOString()
  });
});

// 2. Profile APIs
app.get("/api/profile", (req, res) => {
  try {
    const profile = db.getProfile();
    res.json({ success: true, data: profile });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put("/api/profile", (req, res) => {
  try {
    const updated = db.updateProfile(req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Budgets APIs
app.get("/api/budgets", (req, res) => {
  try {
    const budgets = db.getBudgets();
    res.json({ success: true, data: budgets });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put("/api/budgets", (req, res) => {
  try {
    const budgets = req.body.budgets || req.body;
    const updated = db.updateBudgets(budgets);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Expenses APIs
app.get("/api/expenses", (req, res) => {
  try {
    const expenses = db.getExpenses();
    res.json({ success: true, count: expenses.length, data: expenses });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/expenses", (req, res) => {
  try {
    const newExpense = db.addExpense(req.body);
    res.status(201).json({ success: true, data: newExpense });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put("/api/expenses/:id", (req, res) => {
  try {
    const updated = db.updateExpense(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/expenses/:id", (req, res) => {
  try {
    const result = db.deleteExpense(req.params.id);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Savings Goals APIs
app.get("/api/goals", (req, res) => {
  try {
    const goals = db.getGoals();
    res.json({ success: true, count: goals.length, data: goals });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/goals", (req, res) => {
  try {
    const newGoal = db.addGoal(req.body);
    res.status(201).json({ success: true, data: newGoal });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put("/api/goals/:id", (req, res) => {
  try {
    const updated = db.updateGoal(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/goals/:id/funds", (req, res) => {
  try {
    const amount = Number(req.body.amount) || 0;
    const result = db.addFundsToGoal(req.params.id, amount);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/goals/:id", (req, res) => {
  try {
    const result = db.deleteGoal(req.params.id);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Database Reset API
app.post("/api/reset", (req, res) => {
  try {
    db.resetDatabase();
    res.json({ success: true, message: "Database reset to initial Karnataka demo data" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ================= STATIC FILES SERVING =================
// Serve static client files (HTML, CSS, JS, Assets)
app.use(express.static(path.join(__dirname)));

// Catch-all middleware to serve index.html for client-side navigation
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`SmartFin Server running at http://localhost:${PORT}`);
  console.log(`Database engine: ${db.type.toUpperCase()} (smartfin.db)`);
  console.log(`Ready for hosting and local use!`);
  console.log(`====================================================`);
});
