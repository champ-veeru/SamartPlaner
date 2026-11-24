/**
 * SmartFin - Default Starter Data
 * Realistic Karnataka household profile with initial budget, expenses, and savings goals.
 */

const DEFAULT_USER_PROFILE = {
  name: "Anand Kumar",
  phone: "9845012345",
  age: 29,
  gender: "Male",
  district: "Mysuru",
  state: "Karnataka",
  annualIncome: 360000,
  monthlyIncome: 30000,
  occupation: "Private Employee",
  employmentStatus: "Employed",
  education: "Graduate",
  farmerStatus: "Non-Farmer",
  landholdingAcres: 0,
  disabilityStatus: "No",
  rationCardType: "APL",
  taxPayer: false,
  hasGirlChildUnder10: true,
  familyHeadGender: "Female", // Mother/Wife is head in ration card
  unemployedMonths: 0
};

const DEFAULT_BUDGET_CATEGORIES = [
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

// Helper to get formatted dates in current month
const getRelativeDate = (dayOffset) => {
  const d = new Date();
  d.setDate(d.getDate() - dayOffset);
  return d.toISOString().split("T")[0];
};

const DEFAULT_EXPENSES = [
  {
    id: "exp-1",
    category: "food",
    categoryName: "Food & Groceries",
    amount: 3200,
    date: getRelativeDate(2),
    description: "Monthly rice, daal, oil from local provision store",
    paymentMethod: "UPI"
  },
  {
    id: "exp-2",
    category: "rent",
    categoryName: "Rent & Housing",
    amount: 7000,
    date: getRelativeDate(20),
    description: "House rent for 2BHK Mysuru",
    paymentMethod: "Bank Transfer"
  },
  {
    id: "exp-3",
    category: "food",
    categoryName: "Food & Groceries",
    amount: 1450,
    date: getRelativeDate(12),
    description: "Vegetables and fruits from HOPCOMS market",
    paymentMethod: "Cash"
  },
  {
    id: "exp-4",
    category: "transport",
    categoryName: "Transport & Fuel",
    amount: 1200,
    date: getRelativeDate(7),
    description: "Two-wheeler petrol at Indian Oil pump",
    paymentMethod: "UPI"
  },
  {
    id: "exp-5",
    category: "electricity",
    categoryName: "Electricity & Bills",
    amount: 450,
    date: getRelativeDate(15),
    description: "CESC Electricity bill (subsidized by Gruha Jyothi)",
    paymentMethod: "UPI"
  },
  {
    id: "exp-6",
    category: "education",
    categoryName: "Education & Fees",
    amount: 2200,
    date: getRelativeDate(18),
    description: "School books and tuition fee installment",
    paymentMethod: "UPI"
  },
  {
    id: "exp-7",
    category: "healthcare",
    categoryName: "Healthcare & Medicine",
    amount: 850,
    date: getRelativeDate(9),
    description: "Routine health checkup & pharmacy medicines",
    paymentMethod: "UPI"
  },
  {
    id: "exp-8",
    category: "shopping",
    categoryName: "Shopping & Clothes",
    amount: 1300,
    date: getRelativeDate(4),
    description: "New footwear and shirts",
    paymentMethod: "Card"
  },
  {
    id: "exp-9",
    category: "entertainment",
    categoryName: "Entertainment & Outings",
    amount: 950,
    date: getRelativeDate(5),
    description: "Family dinner at Udupi Veg restaurant",
    paymentMethod: "UPI"
  },
  {
    id: "exp-10",
    category: "food",
    categoryName: "Food & Groceries",
    amount: 900,
    date: getRelativeDate(1),
    description: "Weekly dairy, Nandini milk & curd",
    paymentMethod: "UPI"
  },
  {
    id: "exp-11",
    category: "other",
    categoryName: "Other Expenses",
    amount: 500,
    date: getRelativeDate(8),
    description: "Mobile recharge (Airtel & Jio packs)",
    paymentMethod: "UPI"
  }
];

const DEFAULT_SAVINGS_GOALS = [
  {
    id: "goal-1",
    title: "Emergency Fund (3 Months)",
    category: "Emergency fund",
    icon: "🛡️",
    targetAmount: 60000,
    currentAmount: 28000,
    targetDate: "2027-06-30",
    monthlyContribution: 4000,
    notes: "Kept in high-interest sweep-in bank account"
  },
  {
    id: "goal-2",
    title: "Daughter's Education (Sukanya Samriddhi)",
    category: "Education",
    icon: "🎓",
    targetAmount: 250000,
    currentAmount: 75000,
    targetDate: "2032-12-31",
    monthlyContribution: 2500,
    notes: "Post Office SSY account earning 8.2% tax-free"
  },
  {
    id: "goal-3",
    title: "Electric Two-Wheeler (EV Scooter)",
    category: "Bike",
    icon: "🛵",
    targetAmount: 90000,
    currentAmount: 36000,
    targetDate: "2027-10-31",
    monthlyContribution: 3500,
    notes: "Save fuel costs for daily commute"
  }
];
