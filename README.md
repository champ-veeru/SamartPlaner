# SmartFin – Smart Financial Literacy & Budget Planner

> **“Plan Better. Save Smarter. Discover Your Benefits.”**  
> *(ಉತ್ತಮ ಯೋಜನೆ. ಸ್ಮಾರ್ಟ್ ಉಳಿತಾಯ. ನಿಮ್ಮ ಸವಲತ್ತುಗಳು.)*

A modern, responsive, privacy-first web application designed specifically for the citizens of **Karnataka, India**. 

SmartFin transforms how households manage their money by uniting **Personal Budgeting**, **Daily Expense Tracking**, **Savings Milestones**, **Interactive Financial Literacy**, **Smart Algorithmic Financial Insights**, and a **Karnataka & Central Government Scheme Discovery Engine** into a single cohesive platform.

---

## 🌟 Key Application Modules & Features

```text
SmartFin Architecture
│
├── 1. Home / Landing
│   ├── Hero overview & citizen mission
│   ├── 4 Core Feature Cards
│   └── Official Verified Government Portal seals & direct links
│
├── 2. Dashboard
│   ├── 6 High-Impact Metrics (Income, Expenses, Balance, Savings Rate, Budget Util, Eligible Schemes)
│   ├── Financial Health Score dial (0–100) with status diagnoses
│   ├── Income vs. Expenses vs. Savings comparative bar chart (Chart.js)
│   ├── Category-wise Spending distribution doughnut chart (Chart.js)
│   ├── Recent Household Expense timeline
│   └── Active Savings Goals tracker
│
├── 3. Budget Planner
│   ├── 50/30/20 Rule balanced allocation bar (Needs 50%, Wants 30%, Savings 20%)
│   ├── Automatic formula computation: Income − Expenses = Remaining Money
│   ├── Category-wise spending limits with dynamic color-coded utilization bars (Green / Amber / Red)
│   └── "Auto 50/30/20 Rule" one-click allocation assistant
│
├── 4. Expense Tracker
│   ├── Quick modal to record expenses: Category, Amount (₹), Date, Description, Payment Method
│   ├── Real-time search by keyword, merchant, or notes
│   ├── Filters by Category, Payment Mode (UPI, Cash, Bank Transfer, Card), and Date/Amount sorting
│   ├── Edit and Delete capabilities with live recalculations
│   └── Export to CSV download functionality
│
├── 5. Savings Goals
│   ├── Visual goal cards (Emergency Fund, Education, Laptop, Bike, House, Business, etc.)
│   ├── Target amount, Current saved, Remaining amount, and Completion percentage
│   ├── Estimated completion date and monthly contribution guide
│   ├── "+ Add Money to Goal" quick deposit modal
│   └── Celebration badge upon achieving 100% of target
│
├── 6. Karnataka Government Scheme Finder ⭐
│   ├── Interactive citizen questionnaire covering all 31 districts of Karnataka
│   ├── Input Age, Gender, Income, Occupation, Student/Unemployed/Farmer status, Disability, Ration Card
│   ├── Rule-based evaluation engine categorizing schemes into:
│   │   🟢 Likely Eligible
│   │   🟡 May Be Eligible – Check Requirements
│   │   🔴 Does Not Appear Eligible
│   ├── Detailed breakdown of matching criteria and verification steps
│   ├── Prominent citizen disclaimer (never guarantees eligibility; directs to official portals)
│   └── "Visit Official Website" direct access buttons
│
├── 7. Government Schemes Directory & Search
│   ├── Searchable catalog of 26+ active welfare programs
│   ├── Category filter pills (Women, Agriculture, Employment, Students, Housing, Healthcare, etc.)
│   ├── Level filter (Karnataka State vs. Government of India)
│   └── Detailed scheme inspection modal with benefits, criteria, documents, and application steps
│
├── 8. Financial Literacy
│   ├── 12 public-friendly modules adapted for Karnataka & Indian households
│   ├── Embedded interactive reader with practical action tips
│   ├── Knowledge check quizzes with instant answer feedback
│   └── 3 Interactive Financial Calculators (Loan EMI, Compound Interest / SIP, Emergency Fund)
│
├── 9. Smart Financial Insights
│   ├── Expense-to-income ratio analysis
│   ├── Future wealth compounding projection
│   ├── Category spending concentration alerts
│   ├── Emergency safety cushion adequacy checks
│   └── Top government welfare benefit recommendations
│
└── 10. Profile & Settings
    ├── Citizen demographics management (synced across all views)
    ├── Language toggle assistance (English & ಕನ್ನಡ)
    ├── 100% client-side privacy using LocalStorage
    └── One-click JSON Data Backup export and restore
```

---

## 🏛️ Official Government Schemes Database

SmartFin adheres strictly to **official government sources**, ensuring no third-party or outdated blog information is presented.

### Karnataka State Government Schemes:
1. **Gruha Lakshmi Scheme (ಗೃಹ ಲಕ್ಷ್ಮಿ ಯೋಜನೆ)** – ₹2,000/month DBT to female heads of family with BPL/AAY/APL ration cards *(Dept of Women & Child Development; Seva Sindhu)*.
2. **Yuva Nidhi Scheme (ಯುವ ನಿಧಿ ಯೋಜನೆ)** – ₹3,000/month for unemployed graduates, ₹1,500/month for diploma holders *(Dept of Skill Development; Seva Sindhu)*.
3. **Yuva Udyoga Sethu (ಯುವ ಉದ್ಯೋಗ ಸೇತು)** – Industry apprenticeship stipends & placement matching *(Karnataka Skill Development Corporation)*.
4. **Chief Minister Kaushalya Karnataka Yojana (CMKKY)** – Free NSQF-aligned vocational certification *(Kaushalkar Portal)*.
5. **Krishi Bhagya Scheme (ಕೃಷಿ ಭಾಗ್ಯ ಯೋಜನೆ)** – 80% to 90% subsidy for rainwater farm ponds, diesel/solar pumps, and micro-irrigation *(Dept of Agriculture; Raitha Mitra)*.
6. **Gruha Jyothi Scheme (ಗೃಹ ಜ್ಯೋತಿ ಯೋಜನೆ)** – Up to 200 units of free domestic electricity monthly per household *(Energy Dept; BESCOM/HESCOM/GESCOM/CESC/MESCOM)*.
7. **Shakti Scheme (ಶಕ್ತಿ ಯೋಜನೆ)** – 100% free bus travel for Karnataka women and transgender citizens *(KSRTC, BMTC, NWKRTC, KKRTC)*.
8. **Anna Bhagya Scheme (ಅನ್ನ ಭಾಗ್ಯ ಯೋಜನೆ)** – 5 kg free food grains + ₹170/person/month DBT *(Food, Civil Supplies & Consumer Affairs Dept; Ahara)*.
9. **Karnataka Raitha Siri Scheme (ರೈತ ಸಿರಿ ಯೋಜನೆ)** – ₹10,000/hectare direct incentive for millet growers *(Dept of Agriculture; FRUITS)*.
10. **State Scholarship Portal (SSP) Karnataka** – Pre-matric and post-matric fee reimbursement and hostel allowances *(e-Governance & Social Welfare Depts)*.
11. **Basava Vasathi Yojana / Dr. B.R. Ambedkar Nivas Yojana** – ₹1.2 Lakh to ₹2.0 Lakh pucca housing construction subsidies *(Rajiv Gandhi Housing Corp; Ashraya)*.
12. **Arivu Education Loan Scheme (ಅರಿವು ಯೋಜನೆ)** – Concessional professional education loans up to ₹5 Lakh at 2% interest *(KMDC)*.
13. **Sandhya Suraksha Yojana (ಸಂಧ್ಯಾ ಸುರಕ್ಷಾ ಯೋಜನೆ)** – ₹1,200/month old-age pension for senior citizens aged 65+ *(Revenue Dept; Nadakacheri)*.
14. **Mythri Scheme (ಮೈತ್ರಿ ಯೋಜನೆ)** – Monthly financial assistance of ₹1,200 for transgender individuals *(Directorate of Social Security)*.
15. **Manasvini Scheme (ಮನಸ್ವಿನಿ ಯೋಜನೆ)** – Monthly assistance of ₹1,200 for unmarried (40+) or deserted/divorced women from BPL families *(Social Security Directorate)*.
16. **Karnataka FRUITS Portal** – Unified Farmer ID (FID) providing single-window access to all agriculture, horticulture, and crop insurance benefits.

### Government of India Schemes (Active for Karnataka Residents):
17. **PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)** – ₹6,000/year in three installments of ₹2,000 via DBT *(Integrated with Karnataka FRUITS)*.
18. **PMFBY / Karnataka Samrakshane** – Crop insurance with only 2% Kharif / 1.5% Rabi farmer premium *(samrakshane.karnataka.gov.in)*.
19. **Pradhan Mantri MUDRA Yojana (PMMY)** – Collateral-free business loans under Shishu (up to ₹50k), Kishore (₹50k-₹5L), and Tarun (₹5L-₹10L/₹20L) *(DFS / Mudra)*.
20. **Pradhan Mantri Awas Yojana (PMAY-Urban & Gramin)** – Interest subsidies up to ₹2.67 Lakh or construction grants *(MoHUA & RGHCL)*.
21. **Ayushman Bharat - Arogya Karnataka (AB-ArK / PM-JAY)** – Cashless hospital cover up to ₹5,00,000 per family per year *(SAST & NHA)*.
22. **National Scholarship Portal (NSP) Schemes** – Central Sector and merit-cum-means scholarships for higher education.
23. **Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)** – Free technical certifications and on-job training stipends.
24. **PM SVANidhi** – Working capital micro-loans (₹10k, ₹20k, ₹50k) with 7% interest subsidies for street vendors.
25. **Sukanya Samriddhi Yojana (SSY)** – 8.2% tax-free sovereign interest for girl child education and marriage *(Post Office & Banks)*.
26. **Atal Pension Yojana (APY)** – Guaranteed monthly pension of ₹1,000 to ₹5,000 from age 60 for unorganized sector workers *(PFRDA)*.

---

## 📚 Financial Literacy Curriculum (12 Modules)

1. **How to Create a Household Budget** (The 50/30/20 Rule for Indian Households)
2. **How to Save Money Consistently** (Automation, 30-day rule, cutting micro-leaks)
3. **Building an Emergency Fund** (3 to 6 months of expenses; liquid vs. sweep-in FD)
4. **Simple vs. Compound Interest** (The Rule of 72 and the exponential snowball)
5. **Loans, Interest Rates & EMI Management** (40% safe EMI ceiling; Flat vs. Reducing balance)
6. **Demystifying Credit Score & CIBIL** (750+ benchmark, credit utilization ratio, free reports)
7. **Insurance Decoded: Health, Life & Crop** (Why Term Insurance beats endowment plans; AB-ArK & PMFBY)
8. **Smart Investments for Beginners** (Beating inflation with PPF, SSY, and Mutual Fund Index SIPs)
9. **Digital Payment Safety** (The Golden Rule: You NEVER need a PIN to RECEIVE money on UPI)
10. **Online Financial Fraud Awareness** (Electricity bill scams, fake loan apps, task scams, and **Call 1930 / cybercrime.gov.in**)
11. **How to Maximize Government Welfare Schemes** (Aadhaar-NPCI bank mapping, Seva Sindhu, Grama One)
12. **How to Spot & Avoid Financial Scams** (Ponzi traps, unregulated chit funds, multi-level schemes)

---

## 🛠️ Technology Stack & Architecture

- **Frontend:** Semantic HTML5, Modular CSS3 (custom CSS design system with CSS custom properties), Modern Vanilla JavaScript (ES6+).
- **Data Visualization:** Chart.js (interactive bar charts and category doughnut diagrams).
- **Icons:** Font Awesome 6.4.
- **Persistence:** Browser `LocalStorage` with export/import capability and automated demo data seeding.
- **Modularity:** 
  - `js/data/schemesData.js` – Comprehensive schemes dataset.
  - `js/data/literacyData.js` – Financial literacy modules and quizzes.
  - `js/data/defaultData.js` – Realistic baseline Karnataka household data.
  - `js/services/storage.js` – Storage access layer.
  - `js/services/eligibilityEngine.js` – Rule evaluation engine.
  - `js/services/insightsEngine.js` – Financial health analytics engine.
  - `js/app.js` – Main orchestrator and UI controller.

---

## 🚀 How to Run Locally

You can launch SmartFin in any modern web browser without needing any build tools:

### Option 1: Direct File Open
Double click `index.html` in file explorer or open it in Google Chrome, Microsoft Edge, Firefox, or Safari.

### Option 2: Local HTTP Server (Recommended)
Using Python:
```bash
cd "c:\Users\Veeru G S\OneDrive\Desktop\SmartPlan"
python -m http.server 8085
```
Then open your browser at:
```text
http://localhost:8085
```

---

## 🔮 Roadmap for Scalability (Phase 2 Upgrade)

The codebase has been designed with clean separation of data, logic, and presentation to allow seamless migration to:
- **Frontend:** React / Next.js with Tailwind CSS or TypeScript.
- **Backend:** Node.js with Express / NestJS.
- **Database:** MongoDB or PostgreSQL storing real-time scheme notifications and user accounts.
- **Authentication:** Aadhaar DigiLocker integration or Phone OTP authentication.
- **APIs:** Integration with the official Karnataka KarnatakaOne/Seva Sindhu Open API endpoints and DBT tracker.
