/**
 * SmartFin - Financial Literacy Learning Modules
 * Tailored for Karnataka citizens with relatable examples, Indian context, and practical guidelines.
 */

const LITERACY_MODULES = [
  {
    id: "budgeting-basics",
    title: "How to Create a Household Budget",
    kannadaTitle: "ಮನೆಯ ಬಜೆಟ್ ರೂಪಿಸುವುದು ಹೇಗೆ?",
    category: "Budgeting",
    icon: "📊",
    readTime: "4 min read",
    summary: "Learn the foundational 50/30/20 budgeting rule adapted for Karnataka households to take full control of monthly expenses.",
    keyConcepts: [
      "Needs (50%): Rent, groceries, electricity bill (BESCOM/MESCOM), school fees, medicines.",
      "Wants (30%): Dining out, movies, festive shopping, new clothes, discretionary travel.",
      "Savings & Debt (20%): Recurring deposits, emergency fund, Chit funds/RD, loan prepayment."
    ],
    detailedContent: `
      <h4>Why Budgeting Changes Everything</h4>
      <p>Many households earn well, yet wonder where all the money vanished by the 25th of the month. A budget is not about restricting your happiness—it is a blueprint that tells every single Rupee where to go instead of wondering where it went.</p>
      
      <h4>The 50/30/20 Rule for Indian Households</h4>
      <ul>
        <li><strong>50% on Needs (ಅಗತ್ಯಗಳು):</strong> The non-negotiable costs required to survive and maintain your family. In Karnataka cities like Bengaluru, Mysuru, or Hubballi, this includes house rent, rice/provisions, electricity, water, children's school tuition, and basic health care.</li>
        <li><strong>30% on Wants (ಆಸೆಗಳು):</strong> Expenses that enhance life quality but aren't strictly survival-critical: weekend outings, cinema tickets, festival outfits for Ugadi or Dasara, and eating at restaurants.</li>
        <li><strong>20% on Savings & Investing (ಉಳಿತಾಯ):</strong> The money you set aside before spending anything else. Think of this as paying your future self first!</li>
      </ul>

      <h4>Practical Steps to Start Today</h4>
      <ol>
        <li>Calculate your exact monthly in-hand household take-home income.</li>
        <li>Write down all fixed bills due on the 1st week of the month.</li>
        <li>Set spending caps for weekly groceries and transport.</li>
        <li>Review your progress every Sunday for 5 minutes.</li>
      </ol>
    `,
    actionTip: "Follow the Golden Rule: <em>Income − Savings = Expenses</em>. Never save what is left after spending; spend what is left after saving!",
    quiz: {
      question: "According to the 50/30/20 rule, how much of a ₹30,000 monthly income should ideally go toward savings?",
      options: ["₹3,000 (10%)", "₹6,000 (20%)", "₹15,000 (50%)", "₹0 (Whatever is left)"],
      correctIndex: 1,
      explanation: "20% of ₹30,000 is ₹6,000. Prioritizing 20% toward savings guarantees long-term wealth growth."
    }
  },
  {
    id: "saving-money",
    title: "How to Save Money Consistently",
    kannadaTitle: "ನಿಯಮಿತವಾಗಿ ಹಣ ಉಳಿತಾಯ ಮಾಡುವುದು ಹೇಗೆ?",
    category: "Savings",
    icon: "💰",
    readTime: "4 min read",
    summary: "Proven psychological and banking techniques to build a steady habit of saving every single month without feeling deprived.",
    keyConcepts: [
      "Automate savings using bank standing instructions (Auto-debit on salary day).",
      "Avoid lifestyle inflation when salary or earnings increase.",
      "Track microscopic leaks: Daily tea stalls, multiple OTT subscriptions, food delivery fees."
    ],
    detailedContent: `
      <h4>The Psychology of Consistent Saving</h4>
      <p>Saving money is 20% math and 80% habit. When you wait until the end of the month to save, temptations always consume the balance. Successful savers use structural automation.</p>

      <h4>4 Practical Ways to Cut Costs Without Losing Quality of Life</h4>
      <ul>
        <li><strong>The 30-Day Rule for Big Purchases:</strong> If you feel like buying a new gadget, phone, or expensive garment, wait 30 days. If you still genuinely need it after 30 days, buy it. In 70% of cases, the impulsive urge disappears.</li>
        <li><strong>Leverage Government Guarantee Benefits:</strong> Take full advantage of Karnataka initiatives like <em>Gruha Jyothi</em> (free electricity up to 200 units) and <em>Shakti Scheme</em> (free bus travel for women) to channel saved funds directly into bank RDs.</li>
        <li><strong>Use Recurring Deposits (RD):</strong> Even starting with ₹500 or ₹1,000 auto-debited on the 5th of each month creates financial discipline.</li>
        <li><strong>Audit Subscriptions & Charges:</strong> Check your bank statement for unnecessary SMS alert fees, forgotten digital memberships, or high food ordering delivery markups.</li>
      </ul>
    `,
    actionTip: "Open a separate zero-balance savings account solely for savings, without keeping its debit card in your wallet or adding it to quick UPI apps.",
    quiz: {
      question: "What is the most effective way to ensure you save money every month?",
      options: [
        "Wait until the 30th to see what cash remains",
        "Set up an automatic transfer/RD on the day your income arrives",
        "Keep cash under your mattress",
        "Rely strictly on willpower"
      ],
      correctIndex: 1,
      explanation: "Automating your savings removes temptation and ensures your future is funded first before any discretionary spending occurs."
    }
  },
  {
    id: "emergency-fund",
    title: "Building an Emergency Fund",
    kannadaTitle: "ತುರ್ತು ನಿಧಿ (Emergency Fund) ನಿರ್ಮಾಣ",
    category: "Safety",
    icon: "🛡️",
    readTime: "5 min read",
    summary: "Why an emergency safety net of 3 to 6 months of expenses prevents you from taking predatory high-interest loans.",
    keyConcepts: [
      "Target: 3 to 6 months of essential living expenses.",
      "Keep it liquid: High-interest savings account, sweep-in FD, or liquid mutual funds.",
      "Strict rule: Never use emergency funds for vacations, weddings, or sales."
    ],
    detailedContent: `
      <h4>What is an Emergency Fund?</h4>
      <p>An emergency fund is your family's financial shock-absorber. Life is unpredictable—medical crises, sudden job loss, vehicle breakdowns, or agricultural pump failures can strike without warning. Without an emergency fund, families are forced to borrow from local moneylenders at crippling 3% to 5% monthly interest rates (36% to 60% per year!).</p>

      <h4>How Much Do You Need?</h4>
      <table class="literacy-table">
        <thead>
          <tr><th>Monthly Essential Expenses</th><th>3 Months Target</th><th>6 Months Target</th></tr>
        </thead>
        <tbody>
          <tr><td>₹15,000</td><td>₹45,000</td><td>₹90,000</td></tr>
          <tr><td>₹25,000</td><td>₹75,000</td><td>₹1,50,000</td></tr>
          <tr><td>₹40,000</td><td>₹1,20,000</td><td>₹2,40,000</td></tr>
        </tbody>
      </table>

      <h4>Where Should You Keep It?</h4>
      <p>The goal of an emergency fund is <strong>safety and immediate access</strong>, not high investment returns. Divide your emergency fund into two parts:</p>
      <ul>
        <li><strong>50% in a Savings Bank Account:</strong> Accessible within seconds via ATM or UPI during midnight medical emergencies.</li>
        <li><strong>50% in a Bank Fixed Deposit with Sweep-in:</strong> Earns 6.5% to 7.2% interest while remaining breakable instantly without penalties.</li>
      </ul>
    `,
    actionTip: "Start small: Don't get intimidated by a ₹1,00,000 target. First target ₹10,000, then 1 month's expenses, and gradually expand.",
    quiz: {
      question: "Which of the following is an appropriate use of an emergency fund?",
      options: [
        "Buying gifts during the Deepavali festival",
        "A sudden medical hospitalization or urgent home roof leak repair",
        "Investing in a high-return chit fund or stocks",
        "Purchasing the latest smartphone during a big sale"
      ],
      correctIndex: 1,
      explanation: "Emergency funds exist solely for unexpected, essential survival shocks like sudden illness or urgent repairs."
    }
  },
  {
    id: "compound-interest",
    title: "Simple vs. Compound Interest",
    kannadaTitle: "ಸರಳ ಬಡ್ಡಿ ಮತ್ತು ಚಕ್ರಬಡ್ಡಿ (Compound Interest)",
    category: "Investments",
    icon: "📈",
    readTime: "5 min read",
    summary: "Discover why Albert Einstein called compound interest the eighth wonder of the world and how time multiplies small sums into fortunes.",
    keyConcepts: [
      "Simple Interest: You earn interest only on your principal amount.",
      "Compound Interest: You earn interest on your principal PLUS previously accumulated interest.",
      "The earlier you start, the more dramatic the compounding snowball effect."
    ],
    detailedContent: `
      <h4>The Power of Interest on Interest</h4>
      <p>With simple interest, a ₹10,000 investment at 10% earns ₹1,000 every year forever. But with compound interest:</p>
      <ul>
        <li><strong>Year 1:</strong> ₹10,000 grows to ₹11,000 (earned ₹1,000).</li>
        <li><strong>Year 2:</strong> You earn 10% on ₹11,000 = ₹1,100, reaching ₹12,100.</li>
        <li><strong>Year 10:</strong> Your balance becomes ₹25,937!</li>
        <li><strong>Year 25:</strong> It explodes to ₹1,08,347 without adding an extra rupee!</li>
      </ul>

      <h4>The Cost of Delaying: The Tale of Ramesh vs. Suresh</h4>
      <p>Ramesh starts investing ₹3,000 every month at age 22 in a diversified fund returning 12%. He stops after 10 years (invested ₹3.6 Lakhs total).<br>
      Suresh waits until age 32, then invests ₹3,000 every month for 25 continuous years (invested ₹9 Lakhs total)!<br>
      At age 57, <strong>Ramesh has approximately ₹1.8 Crores</strong>, while Suresh has around ₹1.1 Crores, even though Suresh deposited almost triple the money! Time is the secret multiplier.</p>
    `,
    actionTip: "Even ₹500 a month in a PPF (Public Provident Fund) or Mutual Fund SIP started at age 20 can create immense financial freedom by age 45.",
    quiz: {
      question: "What makes compound interest far more powerful than simple interest over long periods?",
      options: [
        "Banks charge less taxes on compound interest",
        "You earn interest on both the initial money and the accumulated interest",
        "It only works with government bonds",
        "The government doubles the amount automatically"
      ],
      correctIndex: 1,
      explanation: "Compound interest generates exponential growth because your interest earnings earn interest themselves year after year."
    }
  },
  {
    id: "loans-and-emi",
    title: "Loans, Interest Rates & EMI Management",
    kannadaTitle: "ಸಾಲ, ಬಡ್ಡಿದರ ಮತ್ತು ಇಎಂಐ ನಿರ್ವಹಣೆ",
    category: "Debt Management",
    icon: "💳",
    readTime: "5 min read",
    summary: "Distinguish between good debt and dangerous debt, avoid predatory loan apps, and keep monthly EMIs within safe limits.",
    keyConcepts: [
      "Safe Limit: Total monthly loan EMIs should NEVER exceed 40% of monthly income.",
      "Good Debt: Educational loans (Arivu scheme), affordable home loans that build assets.",
      "Dangerous Debt: Credit card rolling interest (42% p.a.), instant 7-day mobile loan apps, unregulated loan sharks."
    ],
    detailedContent: `
      <h4>How to Calculate Your Safe EMI Capacity</h4>
      <p>If your monthly household income is ₹40,000, your total debt commitments (bike loan, personal loan, credit card EMIs) should strictly remain below <strong>₹16,000 (40%)</strong>. Beyond this threshold, any unexpected medical bill or salary delay can push a family into default.</p>

      <h4>Flat Rate vs. Reducing Balance Interest Trap</h4>
      <p>Many private finance dealers claim: <em>"Our interest is only 8% flat!"</em> Beware!<br>
      In a flat-rate loan, you pay interest on the full initial loan even after you have repaid 80% of it. An 8% flat rate actually equals an effective <strong>14% to 15% reducing balance rate</strong>. Always ask the bank or lender for the <em>Effective Annualized Reducing Balance Rate</em>.</p>

      <h4>The 2 Common Debt Payoff Strategies</h4>
      <ul>
        <li><strong>The Debt Avalanche Method (Financially Optimal):</strong> List all loans by interest rate. Pay minimum on all, and attack the loan with the highest interest rate (e.g. 36% credit card or 24% personal loan) with extra cash first.</li>
        <li><strong>The Debt Snowball Method (Psychological Boost):</strong> Pay off the smallest loan balance first (e.g. ₹5,000 owed to a relative) to get an immediate feeling of victory and momentum.</li>
      </ul>
    `,
    actionTip: "If you have multiple high-interest debts, inquire with nationalized banks (Canara Bank, SBI, etc.) about a consolidated debt-consolidation loan at lower interest.",
    quiz: {
      question: "What is the maximum recommended percentage of monthly income that should go toward loan EMIs?",
      options: ["20%", "40%", "70%", "90%"],
      correctIndex: 1,
      explanation: "Financial experts recommend that all your loan EMIs combined should never exceed 40% of your net monthly income."
    }
  },
  {
    id: "credit-score-cibil",
    title: "Demystifying Credit Score & CIBIL",
    kannadaTitle: "ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್ ಮತ್ತು ಸಿಬಿಲ್ (CIBIL) ವಿವರಣೆ",
    category: "Credit",
    icon: "🎯",
    readTime: "4 min read",
    summary: "Understand what your 3-digit CIBIL score means, how banks judge your loan applications, and how to repair a poor score.",
    keyConcepts: [
      "Score range: 300 to 900. A score of 750+ opens access to lowest interest rates.",
      "Most impactful factor: Timely payment history (35% weightage).",
      "Avoid checking loan eligibility across 10 apps at once (triggers hard inquiries)."
    ],
    detailedContent: `
      <h4>What is a CIBIL / Credit Score?</h4>
      <p>Think of your credit score as your financial report card. In India, four credit bureaus (TransUnion CIBIL, Experian, Equifax, CRIF High Mark) record your repayment track record. Whenever you apply for a home loan, vehicle loan, or business credit, banks inspect this number first.</p>

      <h4>Score Interpretation</h4>
      <ul>
        <li><strong>750 – 900 (Excellent):</strong> Instant loan approvals, lowest interest rates, zero processing fees negotiation power.</li>
        <li><strong>700 – 749 (Good):</strong> Loans easily approved at standard prevailing bank rates.</li>
        <li><strong>600 – 699 (Fair):</strong> Higher interest rates demanded; loan approvals require extra collateral or guarantors.</li>
        <li><strong>Below 600 (Poor):</strong> High rejection rate; risk of loan denial from formal banking channels.</li>
      </ul>

      <h4>4 Rules to Build and Maintain a 780+ Score</h4>
      <ol>
        <li>Never pay a bill late. Even a ₹500 missed payment can drop your score by 40 points.</li>
        <li>Keep Credit Utilization Ratio (CUR) below 30%. If your card limit is ₹50,000, don't spend more than ₹15,000 on it.</li>
        <li>Do not close your oldest credit cards; length of credit history demonstrates stability.</li>
        <li>Check your free annual credit report once a year to catch identity theft or reporting errors.</li>
      </ol>
    `,
    actionTip: "Every citizen is legally entitled to one 100% free official credit report per year from each bureau. Check yours without hurting your score.",
    quiz: {
      question: "What is widely considered an excellent CIBIL credit score that qualifies for the best loan interest rates in India?",
      options: ["350+", "500+", "750+", "1000+"],
      correctIndex: 2,
      explanation: "A credit score of 750 and above is considered excellent and allows you to negotiate lower interest rates on home and personal loans."
    }
  },
  {
    id: "insurance-essentials",
    title: "Insurance Decoded: Health, Life & Crop",
    kannadaTitle: "ವಿಮೆ (Insurance) ಮಾಹಿತಿ: ಆರೋಗ್ಯ, ಜೀವ ಮತ್ತು ಬೆಳೆ ವಿಮೆ",
    category: "Protection",
    icon: "🏥",
    readTime: "5 min read",
    summary: "Protect your family from sudden medical poverty and crop loss. Learn why pure Term Insurance beats endowment policies.",
    keyConcepts: [
      "Health Insurance: Protects your savings from single-incident hospital bills.",
      "Term Life Insurance: High cover for low cost; strictly for financial dependents.",
      "Crop Insurance: Karnataka Samrakshane / PMFBY protects farmers from drought and flood losses."
    ],
    detailedContent: `
      <h4>The 3 Insurances Every Household Needs</h4>
      
      <h4>1. Health Insurance (ಆರೋಗ್ಯ ವಿಮೆ)</h4>
      <p>A single major surgery or ICU stay can wipe out 5 years of family savings. First verify if your family is covered under <strong>Ayushman Bharat – Arogya Karnataka (AB-ArK)</strong>, which offers ₹5,00,000 cashless cover per year for BPL families. If you are APL, purchase a basic family floater policy of at least ₹5 to ₹10 Lakhs.</p>

      <h4>2. Pure Term Life Insurance (ಟರ್ಮ್ ಇನ್ಶೂರೆನ್ಸ್)</h4>
      <p>Never mix investment with insurance! Avoid traditional endowment or money-back policies that charge high premiums (₹30,000/yr) for a tiny cover of ₹5 Lakhs.<br>
      A pure <strong>Term Insurance</strong> plan provides a massive ₹50 Lakh to ₹1 Crore cover for as low as ₹600 to ₹1,000 per month for a healthy 28-year-old. If the breadwinner passes away, the family receives the full ₹1 Crore to pay off debts and fund children's schooling.</p>

      <h4>3. Crop & Asset Insurance (ಬೆಳೆ ಮತ್ತು ಆಸ್ತಿ ವಿಮೆ)</h4>
      <p>Karnataka farmers should enroll in <strong>PMFBY via Samrakshane portal</strong> every season before cutoff dates. With only 2% farmer premium, the state and central governments insure your seeds and crops against monsoon failure.</p>
    `,
    actionTip: "Also enroll in PMJJBY (Pradhan Mantri Jeevan Jyoti Bima Yojana) at your bank: ₹2 Lakh life cover for just ₹436/year!",
    quiz: {
      question: "Why is a Pure Term Insurance policy generally recommended over traditional money-back endowment plans?",
      options: [
        "It provides high financial life cover for dependents at an affordable low premium",
        "It gives guaranteed stock market lottery returns",
        "It is mandatory by police law",
        "It pays for festival expenses"
      ],
      correctIndex: 0,
      explanation: "Pure Term insurance gives maximum financial protection (e.g. ₹50 Lakhs to ₹1 Crore) for a fraction of the cost, securing your family if you are not around."
    }
  },
  {
    id: "investments-for-beginners",
    title: "Smart Investments for Beginners",
    kannadaTitle: "ಹರಿಕಾರರಿಗೆ ಸ್ಮಾರ್ಟ್ ಹೂಡಿಕೆ ಮಾರ್ಗದರ್ಶಿ",
    category: "Wealth",
    icon: "🌱",
    readTime: "5 min read",
    summary: "Move beyond keeping cash idle in savings accounts. Explore PPF, Sukanya Samriddhi, Mutual Funds, and Sovereign Gold Bonds.",
    keyConcepts: [
      "Beat Inflation: A 3% bank savings account loses buying power against 6% inflation.",
      "Government Guaranteed: PPF (7.1%), Sukanya Samriddhi (8.2%), National Savings Certificate (7.7%).",
      "Equity Growth: Mutual Fund SIPs for 5+ year horizons."
    ],
    detailedContent: `
      <h4>The Hidden Thief: Inflation (ಹಣದುಬ್ಬರ)</h4>
      <p>If a bag of sona masoori rice costs ₹1,500 today, it will cost approximately ₹2,000 in 5 years at 6% inflation. If your money sits idle in a savings account earning only 2.7% to 3% interest, your wealth is actually shrinking every year!</p>

      <h4>Top Low-Risk Government Investment Avenues</h4>
      <ul>
        <li><strong>Public Provident Fund (PPF):</strong> 15-year term, sovereign government guarantee, 7.1% interest, completely tax-free under section 80C.</li>
        <li><strong>Sukanya Samriddhi Yojana (SSY):</strong> For parents of girls under 10 years. Offers an outstanding 8.2% tax-free interest, perfect for higher education funds.</li>
        <li><strong>Post Office Monthly Income Scheme (POMIS):</strong> Steady, reliable monthly income for retirees.</li>
      </ul>

      <h4>Long-Term Wealth: Mutual Fund SIPs</h4>
      <p>Systematic Investment Plans (SIPs) allow you to invest as little as ₹500 per month into India's top 50 companies (Nifty 50 Index). Over 10 to 15 years, Indian equity index funds have historically delivered 11% to 13% annualized returns, outperforming traditional bank FDs.</p>
    `,
    actionTip: "Never put all your eggs in one basket. Balance your money: 60% in secure debt/government instruments and 40% in equity index funds for growth.",
    quiz: {
      question: "Which government-backed scheme offers an 8.2% tax-free interest rate specifically designed for a girl child's future?",
      options: [
        "Fixed Deposit",
        "Sukanya Samriddhi Yojana (SSY)",
        "Crypto Token",
        "Chit Fund"
      ],
      correctIndex: 1,
      explanation: "Sukanya Samriddhi Yojana offers 8.2% guaranteed tax-free return backed by the Government of India for girls up to age 10."
    }
  },
  {
    id: "digital-payment-safety",
    title: "Digital Payment Safety (UPI, Cards & Net Banking)",
    kannadaTitle: "ಡಿಜಿಟಲ್ ಪಾವತಿ ಸುರಕ್ಷತೆ (UPI, ಕಾರ್ಡ್ ಮತ್ತು ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್)",
    category: "Cyber Safety",
    icon: "🔒",
    readTime: "4 min read",
    summary: "Crucial safety rules when using PhonePe, Google Pay, Paytm, or BHIM so you never lose your hard-earned money to digital tricksters.",
    keyConcepts: [
      "Golden Rule: You NEVER need to enter your UPI PIN to RECEIVE money.",
      "QR Code Rule: Scanning a QR code ALWAYS sends money out from your account.",
      "Never share OTP, CVV, or ATM PIN with anyone, even if caller claims to be your bank manager."
    ],
    detailedContent: `
      <h4>The Number One UPI Golden Rule</h4>
      <p class="literacy-alert"><strong>To RECEIVE money on UPI, you NEVER need to enter your 4-digit or 6-digit UPI PIN!</strong><br>
      UPI PIN is exclusively for authenticating payments SENT out of your account. If someone tells you: <em>"Madam, I have sent your refund/lottery prize of ₹5,000, please scan this QR code and enter your PIN to claim it"</em>—IT IS 100% A FRAUD!</p>

      <h4>Common Digital Payment Traps</h4>
      <ul>
        <li><strong>Collect Request Scams:</strong> Scammers send a 'Payment Request' on PhonePe or GPay labeled "Refund Approved". Tapping 'Pay' and entering your PIN transfers your money to the thief.</li>
        <li><strong>Screen Sharing Traps:</strong> Scammers ask you to install apps like AnyDesk, TeamViewer, or QuickSupport under the guise of solving a KYC issue. Once installed, they view your bank passwords and OTPs live!</li>
        <li><strong>Fake Customer Care Numbers on Google:</strong> Never search Google for "XYZ Bank Customer Care" or "Electricity Bill Helpline". Scammers place fake mobile numbers. Always look for helpline numbers printed on the back of your ATM card or on official government utility bills.</li>
      </ul>
    `,
    actionTip: "Set daily UPI transaction limits in your bank mobile app (e.g., maximum ₹10,000 per day) to contain potential exposure.",
    quiz: {
      question: "When someone says they are transferring ₹2,000 to your bank account and asks you to enter your UPI PIN, what should you do?",
      options: [
        "Quickly enter the PIN to receive the money",
        "Never enter the PIN because receiving money never requires a PIN; it is a scam!",
        "Share your OTP with them instead",
        "Tell them your ATM PIN"
      ],
      correctIndex: 1,
      explanation: "Entering your UPI PIN always deducts money from your account. Receiving funds requires zero authentication from the receiver."
    }
  },
  {
    id: "online-fraud-awareness",
    title: "Online Financial Fraud Awareness & Immediate Action",
    kannadaTitle: "ಆನ್‌ಲೈನ್ ಹಣಕಾಸು ವಂಚನೆ ಜಾಗೃತಿ ಮತ್ತು ತಕ್ಷಣದ ಕ್ರಮ",
    category: "Cyber Safety",
    icon: "🚨",
    readTime: "5 min read",
    summary: "Recognize electricity bill threats, fake loan apps, job task scams, and know the immediate steps to take if scammed (Call 1930).",
    keyConcepts: [
      "Emergency Cybercrime Helpline: Call 1930 within the 'Golden Hour' (first 2 hours).",
      "Official reporting website: cybercrime.gov.in.",
      "Beware of APK file downloads on WhatsApp (e.g., BESCOM_bill.apk or PM_Kisan_update.apk)."
    ],
    detailedContent: `
      <h4>The 4 Most Prevalent Scams in Karnataka Today</h4>
      
      <h4>1. The "Electricity Bill Due" SMS Scam</h4>
      <p>You receive an SMS: <em>"Dear Consumer, your BESCOM/HESCOM power supply will be disconnected tonight at 9:30 PM due to unpaid bill. Immediately contact Electricity Officer at 98xxxxxx."</em><br>
      <strong>Reality:</strong> BESCOM and electricity supply companies never send personal mobile numbers for disconnection threats. They follow official notice procedures.</p>

      <h4>2. Fake Instant Loan APK Apps</h4>
      <p>Advertisements offering <em>"₹50,000 loan in 2 minutes without CIBIL"</em> prompt you to download an unknown APK file. The app secretly steals your contact list and photo gallery, and within 3 days starts blackmailing you and your relatives with morphed photos.</p>

      <h4>3. Part-Time Telegram / YouTube "Like & Earn" Scams</h4>
      <p>Offers claiming you will earn ₹150 for liking YouTube videos or Google Maps places. Initially they pay ₹300 to build trust, then trap you into depositing ₹50,000 for "crypto VIP tasks".</p>

      <h4>What to Do Immediately if You Get Defrauded</h4>
      <ol>
        <li><strong>Call 1930 immediately:</strong> The National Cyber Crime Reporting Portal helpline works with banks to freeze recipient accounts within the first 2 hours (the Golden Hour).</li>
        <li><strong>Block your debit card & UPI:</strong> Call your bank's official toll-free card blocking line.</li>
        <li><strong>File a complaint:</strong> Register the incident on <strong>cybercrime.gov.in</strong> with transaction IDs and screenshots.</li>
      </ol>
    `,
    actionTip: "Save '1930' in your mobile phone contacts right now as 'Cybercrime Police Helpline'.",
    quiz: {
      question: "What is the official Government of India National Cybercrime Helpline number to report financial fraud within the golden hour?",
      options: ["100", "108", "1930", "1800"],
      correctIndex: 2,
      explanation: "1930 is the dedicated national cybercrime reporting helpline operated by the Ministry of Home Affairs to freeze stolen funds."
    }
  },
  {
    id: "government-schemes-guide",
    title: "How to Maximize Government Welfare Schemes",
    kannadaTitle: "ಸರ್ಕಾರಿ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳನ್ನು ಸದುಪಯೋಗಪಡಿಸಿಕೊಳ್ಳುವುದು ಹೇಗೆ?",
    category: "Welfare",
    icon: "🏛️",
    readTime: "4 min read",
    summary: "A step-by-step citizen guide to Direct Benefit Transfer (DBT), Aadhaar-NPCI mapping, and navigating Seva Sindhu & Grama One.",
    keyConcepts: [
      "Aadhaar-NPCI Seeding: Essential for Gruha Lakshmi, Yuva Nidhi, PM-KISAN DBT credits.",
      "Access Portals: Seva Sindhu, Karnataka One, Bangalore One, Grama One, and Bapuji Seva Kendra.",
      "Nadakacheri RD Number: Required for student scholarships and housing subsidies."
    ],
    detailedContent: `
      <h4>Why Many Citizens Miss Out on Scheme Money</h4>
      <p>Thousands of eligible beneficiaries in Karnataka have their scheme applications stuck not because of ineligibility, but due to technical mismatch in bank records. Here is how to ensure your benefits reach you smoothly.</p>

      <h4>The 3 Critical Checklist Items</h4>
      <ul>
        <li><strong>1. Aadhaar-NPCI Bank Seeding:</strong> Having your Aadhaar linked to your bank account for KYC is NOT the same as NPCI mapping! NPCI mapping enables the Reserve Bank and Government DBT gateway to route funds using your 12-digit Aadhaar number. Visit your bank branch and submit a physical <em>"Aadhaar Seeding and NPCI Mapping Consent Form"</em>.</li>
        <li><strong>2. Matching Names Across Records:</strong> Ensure your spelling and date of birth match exactly across your Aadhaar Card, Ration Card, Bank Passbook, and Voter ID. Even a minor spelling discrepancy can cause automated DBT rejection.</li>
        <li><strong>3. Mobile Number Linked with Aadhaar:</strong> Most Karnataka portal services (Seva Sindhu, Ahara, SSP) send authentication OTPs to your Aadhaar-registered mobile number.</li>
      </ul>

      <h4>Where to Get Free Help in Karnataka</h4>
      <p>Never pay private brokers or touts! The Government of Karnataka has authorized over 10,000 public service centers:</p>
      <ul>
        <li><strong>Grama One:</strong> In every Gram Panchayat across rural Karnataka.</li>
        <li><strong>Karnataka One:</strong> In municipal corporations and tier-2/tier-3 cities.</li>
        <li><strong>Bangalore One:</strong> Throughout BBMP wards in Bengaluru.</li>
        <li><strong>Bapuji Seva Kendra:</strong> In rural panchayat offices.</li>
      </ul>
    `,
    actionTip: "Check your Aadhaar-bank linking status anytime on the official NPCI portal or UIDAI website (resident.uidai.gov.in/bank-mapper).",
    quiz: {
      question: "What is necessary for government Direct Benefit Transfer (DBT) funds like Gruha Lakshmi or PM-KISAN to reach your bank account?",
      options: [
        "Paying a registration commission to local agents",
        "Aadhaar card active NPCI seeding with your bank account",
        "Opening 5 different bank accounts",
        "Submitting physical paper applications every week"
      ],
      correctIndex: 1,
      explanation: "Aadhaar-NPCI mapping connects your bank account to the central DBT gateway, allowing welfare payments to credit automatically."
    }
  },
  {
    id: "identifying-financial-scams",
    title: "How to Spot & Avoid Financial Scams & Ponzi Schemes",
    kannadaTitle: "ಹಣಕಾಸು ವಂಚನೆಗಳು ಮತ್ತು ನಕಲಿ ಯೋಜನೆಗಳನ್ನು ಗುರುತಿಸುವುದು",
    category: "Safety",
    icon: "⚠️",
    readTime: "5 min read",
    summary: "Recognize unregistered chit funds, multi-level marketing (MLM) pyramid traps, fake crypto promises, and 'double your money in 3 months' illusions.",
    keyConcepts: [
      "Rule of Thumb: If an investment promises more than 12% to 15% guaranteed returns, it is almost certainly a scam.",
      "Unregistered Chit Funds: Never join chit funds operated on informal paper without Registrar of Chits registration.",
      "Pyramid schemes: If your earnings depend on bringing new members rather than real products, it is an illegal MLM."
    ],
    detailedContent: `
      <h4>The Classic Anatomy of an Investment Scam</h4>
      <p>Every financial scam plays on two human emotions: <strong>Greed and Urgency</strong>. Scammers will present polished office spaces, luxury car photos, and early payouts to convince you that they have discovered a 'secret formula'.</p>

      <h4>Red Flags that Scream "SCAM!"</h4>
      <ul>
        <li><strong>Guaranteed Astronomical Returns:</strong> Promises of <em>"Double your investment in 6 months"</em> or <em>"Earn 2% guaranteed daily returns"</em>. In reality, safe government bonds pay 7% per year, and the Indian stock market averages 12% per year. Anything promising 50% guaranteed return is paying old investors with new investors' money until the owner flees.</li>
        <li><strong>Member Recruitment Pressure:</strong> <em>"Join as a Silver Member for ₹10,000, refer 3 relatives to become Gold Member and earn ₹50,000/month!"</em> This is a Ponzi/Pyramid scheme banned under the Banning of Unregulated Deposit Schemes Act, 2019.</li>
        <li><strong>Unregistered Chit Funds:</strong> Informal chit funds run by neighborhood acquaintances lack bank guarantees. When a member defaults or the organizer flees, families lose their life savings. Only participate in registered chits like <em>Mysore Sales International Ltd (MSIL Chits)</em> or government-registered entities.</li>
        <li><strong>Unregulated Crypto & Forex Trading Apps:</strong> Trading apps operating without RBI or SEBI licensing, advertising easy forex gains on social media reels.</li>
      </ul>
    `,
    actionTip: "Always verify whether a financial company is registered with RBI (for NBFCs/Banks) or SEBI (for investments) before handing over money.",
    quiz: {
      question: "Which of the following is a clear indicator that an investment opportunity is likely a fraudulent scam?",
      options: [
        "It is registered with SEBI or RBI and offers 7% annual returns",
        "It offers a detailed legal prospectus and risk disclosure",
        "It promises 50% guaranteed returns in 3 months and asks you to recruit friends to earn bonuses",
        "It requires Aadhaar and PAN verification"
      ],
      correctIndex: 2,
      explanation: "Astronomical guaranteed returns combined with mandatory referral recruitment are hallmarks of illegal Ponzi/pyramid schemes."
    }
  }
];
