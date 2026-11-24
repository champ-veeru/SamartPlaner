/**
 * SmartFin - Smart Financial Insights & Calculations Engine
 * Computes deep financial ratios, savings projections, and actionable recommendations.
 */

const InsightsEngine = {
  /**
   * Calculate overall financial summary metrics
   */
  calculateFinancialSummary(profile, budgets, expenses, goals) {
    const monthlyIncome = Number(profile.monthlyIncome) || 0;

    // Filter expenses for current month
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-indexed

    // Calculate total expenses and category spending
    let totalExpenses = 0;
    const categorySpending = {};

    expenses.forEach(exp => {
      const expDate = new Date(exp.date);
      // If date is valid and in current month (or use all recent for demo calculation)
      const amount = Number(exp.amount) || 0;
      totalExpenses += amount;

      if (!categorySpending[exp.category]) {
        categorySpending[exp.category] = 0;
      }
      categorySpending[exp.category] += amount;
    });

    const remainingBalance = monthlyIncome - totalExpenses;
    const monthlySavings = remainingBalance > 0 ? remainingBalance : 0;
    const savingsRate = monthlyIncome > 0 ? Math.round((monthlySavings / monthlyIncome) * 100) : 0;
    const expenseRatio = monthlyIncome > 0 ? Math.round((totalExpenses / monthlyIncome) * 100) : 0;

    // Total budgeted
    let totalBudgeted = 0;
    budgets.forEach(b => {
      totalBudgeted += Number(b.budgeted) || 0;
    });
    const budgetUtilization = totalBudgeted > 0 ? Math.round((totalExpenses / totalBudgeted) * 100) : 0;

    // Needs vs Wants vs Savings (50/30/20 Rule)
    let needsSpent = 0;
    let wantsSpent = 0;

    budgets.forEach(b => {
      const spent = categorySpending[b.id] || 0;
      if (b.type === "want") {
        wantsSpent += spent;
      } else {
        needsSpent += spent;
      }
    });

    const needsRatio = monthlyIncome > 0 ? Math.round((needsSpent / monthlyIncome) * 100) : 0;
    const wantsRatio = monthlyIncome > 0 ? Math.round((wantsSpent / monthlyIncome) * 100) : 0;

    // Emergency fund evaluation
    const emergencyGoal = goals.find(g => 
      g.category.toLowerCase().includes("emergency") || 
      g.title.toLowerCase().includes("emergency")
    );
    const emergencySavings = emergencyGoal ? Number(emergencyGoal.currentAmount) : 0;
    const monthlyLivingExpense = totalExpenses > 0 ? totalExpenses : (monthlyIncome * 0.7);
    const emergencyMonthsCovered = monthlyLivingExpense > 0 
      ? Number((emergencySavings / monthlyLivingExpense).toFixed(1)) 
      : 0;

    // Financial Health Score Calculation (0 - 100)
    let healthScore = 0;

    // 1. Savings Rate component (Max 35 pts)
    if (savingsRate >= 30) healthScore += 35;
    else if (savingsRate >= 20) healthScore += 28;
    else if (savingsRate >= 10) healthScore += 18;
    else if (savingsRate > 0) healthScore += 8;

    // 2. Budget Discipline component (Max 25 pts)
    if (budgetUtilization <= 95 && budgetUtilization >= 60) healthScore += 25;
    else if (budgetUtilization <= 100) healthScore += 20;
    else if (budgetUtilization <= 110) healthScore += 10;
    else healthScore += 5;

    // 3. Emergency Fund Adequacy (Max 25 pts)
    if (emergencyMonthsCovered >= 6) healthScore += 25;
    else if (emergencyMonthsCovered >= 3) healthScore += 20;
    else if (emergencyMonthsCovered >= 1) healthScore += 12;
    else if (emergencyMonthsCovered > 0) healthScore += 5;

    // 4. Expense Ratio safety (Max 15 pts)
    if (expenseRatio <= 70) healthScore += 15;
    else if (expenseRatio <= 85) healthScore += 10;
    else if (expenseRatio <= 100) healthScore += 5;

    // Health label
    let healthStatus = "Needs Attention";
    let healthBadgeClass = "health-needs-work";
    if (healthScore >= 80) {
      healthStatus = "Excellent Financial Health";
      healthBadgeClass = "health-excellent";
    } else if (healthScore >= 60) {
      healthStatus = "Good Financial Health";
      healthBadgeClass = "health-good";
    } else if (healthScore >= 45) {
      healthStatus = "Fair - Room for Optimization";
      healthBadgeClass = "health-fair";
    }

    return {
      monthlyIncome,
      totalExpenses,
      remainingBalance,
      monthlySavings,
      savingsRate,
      expenseRatio,
      totalBudgeted,
      budgetUtilization,
      categorySpending,
      needsSpent,
      wantsSpent,
      needsRatio,
      wantsRatio,
      emergencySavings,
      emergencyMonthsCovered,
      healthScore,
      healthStatus,
      healthBadgeClass
    };
  },

  /**
   * Generate personalized natural-language insights and suggestions
   */
  generateInsights(summary, profile, budgets, goals, evaluatedSchemes = []) {
    const insights = [];

    // 1. Expense Ratio Insight
    if (summary.expenseRatio > 90) {
      insights.push({
        id: "ins-high-expense",
        type: "warning",
        icon: "⚠️",
        title: "High Monthly Expense Ratio",
        message: `Your monthly expenses are ${summary.expenseRatio}% of your income. You are living very close to your earning limit with minimal breathing room for emergencies.`,
        actionText: "Review discretionary wants and cap non-essential spending."
      });
    } else if (summary.expenseRatio <= 70) {
      insights.push({
        id: "ins-healthy-expense",
        type: "success",
        icon: "✅",
        title: "Healthy Expense Discipline",
        message: `Your expenses are ${summary.expenseRatio}% of your monthly income. Keeping expenses under 70% protects your family from cash flow distress.`,
        actionText: "Maintain this discipline and route surplus into recurring deposits."
      });
    } else {
      insights.push({
        id: "ins-moderate-expense",
        type: "info",
        icon: "ℹ️",
        title: "Moderate Expense Ratio",
        message: `Your expenses are currently ${summary.expenseRatio}% of your monthly income (recommended ceiling is 70%).`,
        actionText: "Aim to trim 5% from shopping or entertainment to reach the ideal benchmark."
      });
    }

    // 2. Savings Rate & Long-term Projections
    if (summary.monthlySavings > 0) {
      const oneYearSavings = summary.monthlySavings * 12;
      // 5 years with 7% compound interest
      const monthlyRate = 0.07 / 12;
      const months = 60;
      const fiveYearCompounded = Math.round(
        summary.monthlySavings * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
      );

      insights.push({
        id: "ins-savings-growth",
        type: "success",
        icon: "📈",
        title: "Future Wealth Projection",
        message: `If you save ₹${summary.monthlySavings.toLocaleString("en-IN")} every month, you can save ₹${oneYearSavings.toLocaleString("en-IN")} in one year! In 5 years with a 7% safe return, your wealth will grow to approximately ₹${fiveYearCompounded.toLocaleString("en-IN")}.`,
        actionText: "Consider setting up an auto-debit SIP in a sovereign PPF or mutual fund."
      });
    } else {
      insights.push({
        id: "ins-zero-savings",
        type: "warning",
        icon: "🚨",
        title: "Zero Monthly Surplus",
        message: "Your expenses currently equal or exceed your monthly earnings, leaving zero money for savings.",
        actionText: "Audit the Budget Planner to cut non-essential entertainment and shopping."
      });
    }

    // 3. Category Spending Breakdown
    let maxSpentCategory = null;
    let maxSpentAmount = 0;
    Object.keys(summary.categorySpending).forEach(catId => {
      if (summary.categorySpending[catId] > maxSpentAmount) {
        maxSpentAmount = summary.categorySpending[catId];
        maxSpentCategory = catId;
      }
    });

    if (maxSpentCategory) {
      const matchedCat = budgets.find(b => b.id === maxSpentCategory);
      const catName = matchedCat ? matchedCat.name : maxSpentCategory;
      const catPercent = summary.totalExpenses > 0 
        ? Math.round((maxSpentAmount / summary.totalExpenses) * 100) 
        : 0;

      insights.push({
        id: "ins-top-category",
        type: "info",
        icon: "🔍",
        title: `Top Spending Category: ${catName}`,
        message: `${catName} accounts for ₹${maxSpentAmount.toLocaleString("en-IN")} (${catPercent}% of all your spending this month).`,
        actionText: `Ensure ${catName} remains within your planned ₹${(matchedCat ? matchedCat.budgeted : 0).toLocaleString("en-IN")} limit.`
      });
    }

    // 4. Emergency Fund Analysis
    if (summary.emergencyMonthsCovered < 1) {
      insights.push({
        id: "ins-emergency-alert",
        type: "warning",
        icon: "🛡️",
        title: "Emergency Safety Net Missing",
        message: `You currently have ₹${summary.emergencySavings.toLocaleString("en-IN")} allocated for emergency funds (only ${summary.emergencyMonthsCovered} months of expenses). Sudden vehicle breakdowns or medical shocks could force you into borrowing high-interest loans.`,
        actionText: "Prioritize saving at least 3 months of expenses (₹" + Math.round(summary.totalExpenses * 3).toLocaleString("en-IN") + ")."
      });
    } else if (summary.emergencyMonthsCovered < 3) {
      insights.push({
        id: "ins-emergency-building",
        type: "info",
        icon: "🛡️",
        title: "Emergency Fund in Progress",
        message: `Your emergency fund currently covers ${summary.emergencyMonthsCovered} months of household expenses. You are on the right path toward the recommended 3 to 6 months safety cushion.`,
        actionText: "Keep adding monthly contributions until you hit 3 months full coverage."
      });
    } else {
      insights.push({
        id: "ins-emergency-secure",
        type: "success",
        icon: "🛡️",
        title: "Emergency Fund Well-Protected",
        message: `Outstanding! Your emergency fund covers ${summary.emergencyMonthsCovered} months of living expenses, providing your family with rock-solid security.`,
        actionText: "Now focus excess surplus on medium and long-term wealth goals."
      });
    }

    // 5. Scheme Discovery Recommendation
    const likelySchemes = evaluatedSchemes.filter(s => s.status === "likely");
    if (likelySchemes.length > 0) {
      const schemeNames = likelySchemes.slice(0, 3).map(s => s.scheme.name).join(", ");
      insights.push({
        id: "ins-schemes-match",
        type: "scheme",
        icon: "⭐",
        title: "Government Benefits Available",
        message: `Based on your profile, you are likely eligible for ${likelySchemes.length} government schemes including: ${schemeNames}!`,
        actionText: "Visit the 'Find Schemes for Me' section to review application steps and required documents."
      });
    }

    return insights;
  }
};
