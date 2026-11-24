/**
 * SmartFin - Comprehensive Karnataka & Government of India Schemes Database
 * Sources: Official Karnataka Government Portals (Seva Sindhu, Ahara, SSP, Nadakacheri, FRUITS)
 * & Government of India Portals (PM-KISAN, PMFBY, Mudra, AB-PMJAY).
 * Last verified: Official State & Central Portals (Active 2024-2026)
 */

const SCHEMES_DATABASE = [
  // ==================== KARNATAKA STATE GOVERNMENT SCHEMES ====================
  {
    id: "gruha-lakshmi",
    name: "Gruha Lakshmi Scheme",
    kannadaName: "ಗೃಹ ಲಕ್ಷ್ಮಿ ಯೋಜನೆ",
    category: "Women",
    level: "Karnataka State",
    department: "Department of Women & Child Development, Government of Karnataka",
    portalName: "Seva Sindhu Guarantee Schemes Portal",
    whoCanApply: "Female heads of family residing in Karnataka with BPL, Antyodaya (AAY), or APL ration cards.",
    eligibilityCriteria: [
      "Woman must be designated as the 'Head of the Family' in the ration card issued by the Food and Civil Supplies Department.",
      "Must be a permanent resident of Karnataka.",
      "Neither the woman applicant nor her husband should be an Income Tax assessee / payer.",
      "Neither the woman applicant nor her husband should be a registered Goods & Services Tax (GST) payer.",
      "Only one eligible woman per ration card / family is permitted."
    ],
    eligibilityRules: {
      gender: ["Female"],
      minAge: 18,
      maxAge: 100,
      maxAnnualIncome: 300000,
      rationCardRequired: ["BPL", "AAY", "APL"],
      taxPayerAllowed: false,
      occupationExcluded: ["Govt Employee", "Income Tax Payer"],
      stateOnly: "Karnataka"
    },
    benefits: [
      "Direct financial assistance of ₹2,000 per month credited directly to the woman head's Aadhaar-linked bank account (DBT).",
      "Total annual financial support of ₹24,000 to enhance women's economic independence and household nutrition.",
      "Completely free application process with zero intermediary fees."
    ],
    requiredDocuments: [
      "Ration Card (BPL, Antyodaya, or APL card with woman registered as family head)",
      "Aadhaar Card of the applicant (woman head of family)",
      "Aadhaar Card of the husband (for verification)",
      "Aadhaar-linked Bank Passbook / Bank Account with active NPCI mapping",
      "Active mobile number linked with Aadhaar"
    ],
    applicationProcess: [
      "Check eligibility and schedule appointment via Seva Sindhu portal or SMS alert.",
      "Visit nearest Grama One, Karnataka One, Bangalore One, or Bapuji Seva Kendra (BSK).",
      "Submit Ration Card number, Aadhaar numbers, and bank account details.",
      "Biometric or OTP authentication is carried out on the portal free of charge.",
      "Receive acknowledgment receipt with application reference ID.",
      "Track DBT payment status on Seva Sindhu or DBT Karnataka mobile application."
    ],
    officialWebsite: "https://sevasindhugs.karnataka.gov.in",
    sourceName: "Karnataka Department of Women and Child Development",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["gruha lakshmi", "women", "dbt", "guarantee", "family head", "ration card", "karnataka", "2000"]
  },
  {
    id: "yuva-nidhi",
    name: "Yuva Nidhi Scheme",
    kannadaName: "ಯುವ ನಿಧಿ ಯೋಜನೆ",
    category: "Employment",
    level: "Karnataka State",
    department: "Department of Skill Development, Entrepreneurship and Livelihood, Govt of Karnataka",
    portalName: "Seva Sindhu Guarantee Scheme Portal",
    whoCanApply: "Unemployed graduates and diploma holders who completed degrees in Karnataka and have not found employment after 6 months (180 days).",
    eligibilityCriteria: [
      "Applicant must have passed degree or diploma course from recognized universities/colleges in Karnataka.",
      "Must have remained unemployed for at least 180 days (6 months) from the date of graduation/diploma results.",
      "Must be a domicile of Karnataka (studied in Karnataka for at least 6 years).",
      "Must not be pursuing higher education (full-time postgraduate, etc.).",
      "Must not be employed in government, public, or private sector organizations.",
      "Must not be self-employed with GST registration or receiving apprentice stipends."
    ],
    eligibilityRules: {
      gender: ["Female", "Male", "Transgender"],
      minAge: 18,
      maxAge: 35,
      educationRequired: ["Diploma", "Graduate", "Post Graduate"],
      employmentStatus: ["Unemployed"],
      stateOnly: "Karnataka"
    },
    benefits: [
      "Financial unemployment allowance of ₹3,000 per month for Degree holders.",
      "Financial unemployment allowance of ₹1,500 per month for Diploma holders.",
      "Provided for a maximum duration of 24 months (2 years) or until candidate gets employed/self-employed.",
      "Free access to skill development programs and job fairs conducted by Karnataka Skill Development Corporation."
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Degree / Diploma Marks Card or Provisional Degree Certificate (PDC)",
      "Karnataka Domicile / Study Certificate (proving at least 6 years education in Karnataka)",
      "Aadhaar-seeded Bank Account Passbook (active NPCI mapping)",
      "Self-declaration certificate affirming unemployment status",
      "Mobile number linked to Aadhaar"
    ],
    applicationProcess: [
      "Visit the official Seva Sindhu portal (sevasindhugs.karnataka.gov.in) or visit nearest Karnataka One / Grama One center.",
      "Enter University Registration Number (URN) to verify degree/diploma completion with the Karnataka State Higher Education Council database.",
      "Enter Aadhaar number and complete OTP verification.",
      "Provide bank account and active phone number.",
      "Submit monthly self-declaration affirming continuous unemployment between 25th to 10th of every month to maintain DBT disbursement."
    ],
    officialWebsite: "https://sevasindhugs.karnataka.gov.in",
    sourceName: "Karnataka Department of Skill Development",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["yuva nidhi", "youth", "unemployed", "graduates", "diploma", "skill development", "3000", "allowance"]
  },
  {
    id: "yuva-udyoga-sethu",
    name: "Yuva Udyoga Sethu (Karnataka Skill Connect)",
    kannadaName: "ಯುವ ಉದ್ಯೋಗ ಸೇತು (ಕೌಶಲ್ಯ ಸಂಪರ್ಕ)",
    category: "Skill Development",
    level: "Karnataka State",
    department: "Karnataka Skill Development Corporation (KSDC)",
    portalName: "Karnataka Skill Connect Portal",
    whoCanApply: "Karnataka job seekers, fresh graduates, ITI/Diploma holders, and unorganized youth seeking employment, paid apprenticeships, or industry training.",
    eligibilityCriteria: [
      "Resident of Karnataka aged between 18 and 35 years.",
      "Candidates with education ranging from 10th standard, ITI, Diploma, BCA/B.Sc/B.Com/B.E to Postgraduates.",
      "Both freshers and experienced job seekers seeking formal industry placement or apprenticeships."
    ],
    eligibilityRules: {
      gender: ["Female", "Male", "Transgender"],
      minAge: 18,
      maxAge: 35,
      educationRequired: ["SSLC/10th", "PUC/12th", "Diploma", "Graduate", "Post Graduate"],
      stateOnly: "Karnataka"
    },
    benefits: [
      "Direct linkage with over 2,000+ verified corporate employers across Bengaluru, Mysuru, Hubballi, Belagavi, and Mangaluru.",
      "Access to Government-sponsored paid apprenticeship schemes with monthly stipends (₹8,000 to ₹15,000).",
      "Direct invitation to Mega Job Melas and district-level placement drives.",
      "Soft skills, interview readiness, and resume enhancement modules."
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Highest educational qualification marksheets",
      "Resume / Curriculum Vitae",
      "Passport size photograph",
      "Category / Caste certificate (if seeking reserved quota apprenticeships)"
    ],
    applicationProcess: [
      "Visit the Karnataka Skill Connect portal (skillconnect.kaushalkar.com).",
      "Create jobseeker profile with Aadhaar and educational records.",
      "Specify preferred industry sectors (IT, Manufacturing, Retail, Healthcare, Logistics, Automotive).",
      "Apply directly to posted vacancies and corporate internship openings.",
      "Receive interview notifications and venue passes for upcoming district Job Melas."
    ],
    officialWebsite: "https://skillconnect.kaushalkar.com",
    sourceName: "Karnataka Skill Development Corporation",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["jobs", "employment", "internship", "apprenticeship", "youth", "skill connect", "job mela"]
  },
  {
    id: "cmkky",
    name: "Chief Minister Kaushalya Karnataka Yojana (CMKKY)",
    kannadaName: "ಮುಖ್ಯಮಂತ್ರಿ ಕೌಶಲ್ಯ ಕರ್ನಾಟಕ ಯೋಜನೆ",
    category: "Skill Development",
    level: "Karnataka State",
    department: "Skill Development, Entrepreneurship and Livelihood Department, Govt of Karnataka",
    portalName: "Kaushalkar Portal",
    whoCanApply: "School and college dropouts, rural youth, women, and unemployed youth seeking free technical vocational training.",
    eligibilityCriteria: [
      "Resident of Karnataka aged between 18 and 35 years (upper age limit 40 years for SC/ST/Women/PWD).",
      "Minimum educational qualification from 8th/10th standard upwards depending on the selected course.",
      "Should not have previously availed free government vocational training under the same trade."
    ],
    eligibilityRules: {
      gender: ["Female", "Male", "Transgender"],
      minAge: 18,
      maxAge: 40,
      stateOnly: "Karnataka"
    },
    benefits: [
      "100% free NSQF-aligned skill training across 30+ sectors (Healthcare, Solar Energy, Electronics, CNC, Beauty & Wellness, IT-ITeS).",
      "Government-recognized Skill Certificate issued by the National Council for Vocational Training (NCVT) / NSDC.",
      "Placement assistance and self-employment toolkits/mentorship.",
      "Travel and food allowance support for eligible candidates during training."
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "School Leaving Certificate or Marks Card",
      "Caste and Income Certificate (Nadakacheri issued)",
      "Bank Account details",
      "Passport size photographs"
    ],
    applicationProcess: [
      "Register on kaushalkar.karnataka.gov.in or download the Kaushalkar Mobile App.",
      "Select desired skill training course and nearest accredited Government Tool Room & Training Centre (GTTC) / ITI center.",
      "Attend document verification at the designated center.",
      "Complete the training curriculum and clear assessment test to receive NSQF certification."
    ],
    officialWebsite: "https://kaushalkar.karnataka.gov.in",
    sourceName: "Karnataka Skill Development Mission",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["skill development", "vocational training", "cmkky", "iti", "youth", "certification", "free training"]
  },
  {
    id: "krishi-bhagya",
    name: "Krishi Bhagya Scheme",
    kannadaName: "ಕೃಷಿ ಭಾಗ್ಯ ಯೋಜನೆ",
    category: "Agriculture",
    level: "Karnataka State",
    department: "Department of Agriculture, Government of Karnataka",
    portalName: "Raitha Mitra Portal",
    whoCanApply: "Dry-zone and rainfed agricultural farmers in Karnataka holding valid land records (RTC/Pahani).",
    eligibilityCriteria: [
      "Must be an agricultural landholder in dryland / rainfed farming taluks across Karnataka.",
      "Must possess valid Pahani (RTC) in Karnataka FRUITS database.",
      "Priority accorded to small and marginal farmers, SC/ST farmers, and women agriculturists."
    ],
    eligibilityRules: {
      farmerRequired: true,
      minAge: 18,
      stateOnly: "Karnataka"
    },
    benefits: [
      "80% to 90% Government subsidy for construction of Farm Ponds (Krishi Honda) for rainwater harvesting.",
      "Subsidy for polythene lining of farm ponds to prevent water percolation.",
      "Up to 50% to 90% subsidy on diesel/solar pumpsets and micro-irrigation systems (drip and sprinkler units).",
      "Subsidized shade nets and polyhouses for protective high-value horticulture farming."
    ],
    requiredDocuments: [
      "Land RTC / Pahani with valid survey number",
      "FRUITS FID Number (Farmer Registration and Unified Beneficiary Information System)",
      "Aadhaar Card of the farmer",
      "Small / Marginal Farmer Certificate from Village Accountant / Tahsildar",
      "Caste Certificate (for SC/ST 90% subsidy eligibility)",
      "Bank Passbook copy"
    ],
    applicationProcess: [
      "Visit the nearest Raitha Samparka Kendra (RSK) or apply online via K-Kisan / FRUITS portal.",
      "Submit application with RTC and proposed farm pond location.",
      "Field inspection carried out by Agriculture Officer.",
      "Work order issued; farm pond constructed as per technical specification.",
      "GPS tagging of pond and direct DBT disbursement of subsidy amount."
    ],
    officialWebsite: "https://raitamitra.karnataka.gov.in",
    sourceName: "Karnataka Department of Agriculture",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["krishi bhagya", "farmers", "agriculture", "farm pond", "irrigation", "subsidy", "fruits"]
  },
  {
    id: "gruha-jyothi",
    name: "Gruha Jyothi Scheme",
    kannadaName: "ಗೃಹ ಜ್ಯೋತಿ ಯೋಜನೆ",
    category: "Financial Assistance",
    level: "Karnataka State",
    department: "Energy Department, Government of Karnataka",
    portalName: "Seva Sindhu Guarantee Scheme Portal",
    whoCanApply: "All domestic electricity consumers (homeowners and tenants) in Karnataka.",
    eligibilityCriteria: [
      "Applies strictly to domestic household electricity connections (BESCOM, MESCOM, HESCOM, GESCOM, CESC).",
      "Electricity consumption calculated based on monthly average of preceding 12 months + 10% buffer.",
      "Maximum free electricity ceiling is 200 units per month.",
      "Commercial establishments, shops, and industrial connections are strictly excluded.",
      "Only one electricity meter per domestic household/beneficiary allowed."
    ],
    eligibilityRules: {
      minAge: 18,
      stateOnly: "Karnataka"
    },
    benefits: [
      "Zero electricity bill up to 200 units per month if consumption remains within the calculated monthly entitled average.",
      "Significant annual household saving of ₹8,000 to ₹18,000 on electricity costs.",
      "Applicable to both self-occupied houses and tenant-occupied rented homes."
    ],
    requiredDocuments: [
      "Electricity Consumer Account ID / Meter Account Number (from electricity bill)",
      "Aadhaar Card of the consumer / tenant",
      "Rental agreement / Voter ID / Aadhaar showing current address (for tenants)",
      "Mobile number linked to Aadhaar"
    ],
    applicationProcess: [
      "Log into sevasindhugs.karnataka.gov.in or visit Bangalore One / Karnataka One / Grama One centers.",
      "Select your ESCOM (BESCOM, HESCOM, GESCOM, CESC, MESCOM).",
      "Enter Account ID / Consumer Number and Aadhaar number.",
      "Complete Aadhaar OTP verification and submit declaration.",
      "Receive registration acknowledgment number; zero billing begins from next billing cycle."
    ],
    officialWebsite: "https://sevasindhugs.karnataka.gov.in",
    sourceName: "Karnataka Energy Department",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["gruha jyothi", "electricity", "energy", "bescom", "free power", "guarantee", "karnataka"]
  },
  {
    id: "shakti-scheme",
    name: "Shakti Scheme",
    kannadaName: "ಶಕ್ತಿ ಯೋಜನೆ",
    category: "Women",
    level: "Karnataka State",
    department: "Transport Department, Government of Karnataka",
    portalName: "KSRTC / Transport Portal",
    whoCanApply: "All women, girl students, and transgender individuals who are permanent residents of Karnataka.",
    eligibilityCriteria: [
      "Applicant must be female or transgender.",
      "Must be a resident / domicile of Karnataka.",
      "Valid on intra-state travel within Karnataka boundaries.",
      "Applies to ordinary, express, and city bus services operated by KSRTC, BMTC, NWKRTC, and KKRTC (excludes luxury, sleeper, and AC bus services like Rajahamsa, Airavat, Flybus)."
    ],
    eligibilityRules: {
      gender: ["Female", "Transgender"],
      stateOnly: "Karnataka"
    },
    benefits: [
      "100% free bus travel across all non-luxury state transport corporation buses throughout Karnataka.",
      "Substantial monthly savings of ₹1,000 to ₹3,500 for working women and girl students on daily commute.",
      "Promotes women's participation in workforce and higher education."
    ],
    requiredDocuments: [
      "Any Government-issued Photo Identity Card with Karnataka residential address (Aadhaar Card, Voter ID, Driving License, or Shakti Smart Card)"
    ],
    applicationProcess: [
      "Immediate access: Show any government-issued ID card indicating Karnataka address directly to the bus conductor to receive a zero-fare ticket.",
      "Optional Smart Card: Apply online through Seva Sindhu portal (sevasindhuservices.karnataka.gov.in) with Aadhaar and photograph to obtain a physical Shakti Smart Card."
    ],
    officialWebsite: "https://transport.karnataka.gov.in",
    sourceName: "Karnataka Transport Department & KSRTC",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["shakti", "free bus", "women", "transgender", "ksrtc", "bmtc", "travel", "karnataka"]
  },
  {
    id: "anna-bhagya",
    name: "Anna Bhagya Scheme (Food Security & Rice DBT)",
    kannadaName: "ಅನ್ನ ಭಾಗ್ಯ ಯೋಜನೆ",
    category: "Financial Assistance",
    level: "Karnataka State",
    department: "Food, Civil Supplies and Consumer Affairs Department, Govt of Karnataka",
    portalName: "Ahara Karnataka Portal",
    whoCanApply: "All members of Antyodaya Anna Yojana (AAY) and Priority Household (BPL) ration cards in Karnataka.",
    eligibilityCriteria: [
      "Must hold a valid BPL (Priority Household) or AAY (Antyodaya) ration card in Karnataka.",
      "Cardholder must have Aadhaar e-KYC completed for all family members.",
      "Bank account of the head of family must be seeded with Aadhaar in NPCI mapping."
    ],
    eligibilityRules: {
      rationCardRequired: ["BPL", "AAY"],
      maxAnnualIncome: 120000,
      stateOnly: "Karnataka"
    },
    benefits: [
      "5 kg free food grains per person per month under Central NFSA.",
      "Direct Benefit Transfer (DBT) of ₹170 per person per month (equivalent to 5 kg of rice at ₹34/kg) credited directly to the family head's bank account.",
      "A 4-member BPL family receives ₹680 per month in cash + 20 kg free food grains."
    ],
    requiredDocuments: [
      "Active BPL / Antyodaya Ration Card",
      "Aadhaar Cards of all family members registered on the ration card",
      "Bank account linked with Aadhaar (NPCI seeded) of the family head"
    ],
    applicationProcess: [
      "Automatic eligibility for existing verified BPL and AAY card holders in Karnataka.",
      "Verify Aadhaar seeding and bank link status on the Ahara portal (ahara.kar.nic.in).",
      "Collect food grain quota from nearest Fair Price Shop (FPS) and receive monthly cash component via DBT."
    ],
    officialWebsite: "https://ahara.kar.nic.in",
    sourceName: "Food and Civil Supplies Department, Karnataka",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["anna bhagya", "ration", "bpl", "rice", "food security", "dbt", "ahara"]
  },
  {
    id: "raitha-siri",
    name: "Karnataka Raitha Siri Scheme",
    kannadaName: "ಕರ್ನಾಟಕ ರೈತ ಸಿರಿ ಯೋಜನೆ",
    category: "Agriculture",
    level: "Karnataka State",
    department: "Department of Agriculture, Government of Karnataka",
    portalName: "Raitha Mitra & FRUITS Portal",
    whoCanApply: "Farmers cultivating minor millets (Siri Dhanya: Foxtail, Kodo, Little, Barnyard, Proso, Brown Top) in Karnataka.",
    eligibilityCriteria: [
      "Must be an agricultural landholder in Karnataka cultivating recognized minor millets.",
      "Land ownership must be validated through RTC (Pahani) and crop survey.",
      "Farmer must be enrolled on the FRUITS portal with a valid FID."
    ],
    eligibilityRules: {
      farmerRequired: true,
      minAge: 18,
      stateOnly: "Karnataka"
    },
    benefits: [
      "Direct financial incentive of ₹10,000 per hectare (up to a maximum of 2 hectares or ₹20,000) directly into the farmer's bank account via DBT.",
      "Encourages water-resilient, climate-smart crop cultivation.",
      "Subsidy on certified organic and high-yielding millet seeds."
    ],
    requiredDocuments: [
      "Farmer Registration ID (FRUITS FID)",
      "Pahani / RTC with crop verification in Joint Crop Survey",
      "Aadhaar Card",
      "Bank Passbook seeded with Aadhaar"
    ],
    applicationProcess: [
      "Register farmer profile on fruits.karnataka.gov.in.",
      "Ensure millet crop is recorded during the Karnataka Seasonal Farmer Crop Survey.",
      "Submit application at nearest Raitha Samparka Kendra (RSK) or online.",
      "Funds transferred directly via DBT after satellite / field verification."
    ],
    officialWebsite: "https://raitamitra.karnataka.gov.in",
    sourceName: "Karnataka Department of Agriculture",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["raitha siri", "millets", "agriculture", "farmer", "siri dhanya", "subsidy", "fruits"]
  },
  {
    id: "ssp-scholarship",
    name: "State Scholarship Portal (SSP) Karnataka",
    kannadaName: "ರಾಜ್ಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್ (SSP)",
    category: "Students",
    level: "Karnataka State",
    department: "Social Welfare, Backward Classes Welfare, Minorities Welfare, & Higher Education Departments",
    portalName: "SSP Post-Matric & Pre-Matric Portal",
    whoCanApply: "Pre-matric and post-matric students belonging to SC, ST, OBC, Minority, and General EWS communities studying in Karnataka.",
    eligibilityCriteria: [
      "Student must be a permanent resident of Karnataka enrolled in recognized school, PU College, Polytechnic, Degree, or PG institution.",
      "Annual family income ceiling: Up to ₹2.5 Lakhs for SC/ST; up to ₹1.0 Lakh to ₹2.5 Lakh for OBC Category-1, 2A, 3A, 3B; up to ₹2.5 Lakh for Minorities.",
      "Must have a valid Caste and Income Certificate with an RD number issued by Nadakacheri."
    ],
    eligibilityRules: {
      studentRequired: true,
      minAge: 14,
      maxAge: 32,
      maxAnnualIncome: 250000,
      educationRequired: ["SSLC/10th", "PUC/12th", "Diploma", "Graduate", "Post Graduate"],
      stateOnly: "Karnataka"
    },
    benefits: [
      "Full or partial fee reimbursement for government and aided college fees.",
      "Monthly maintenance allowance and hostel fee subsidies.",
      "Direct disbursement into student's Aadhaar-linked bank account (no college delay).",
      "Special incentives for meritorious and professional course students."
    ],
    requiredDocuments: [
      "Student SATS ID (for school/PUC) or University Registration Number",
      "Aadhaar Card of the student and parent",
      "Caste and Income Certificate (RD number from Nadakacheri)",
      "Fee receipt and college admission allotment letter",
      "Bank Account details seeded with Aadhaar (NPCI)"
    ],
    applicationProcess: [
      "Visit ssp.postmatric.karnataka.gov.in.",
      "Create student account using Aadhaar and Nadakacheri RD numbers.",
      "Fetch college course details through university database.",
      "Upload required certificates and submit application.",
      "College verification and departmental e-Attestation followed by direct DBT."
    ],
    officialWebsite: "https://ssp.postmatric.karnataka.gov.in",
    sourceName: "e-Governance Department, Karnataka",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["ssp", "scholarship", "students", "fee reimbursement", "post-matric", "hostel", "karnataka"]
  },
  {
    id: "basava-vasathi",
    name: "Basava Vasathi Yojana / Dr. B.R. Ambedkar Nivas Yojana",
    kannadaName: "ಬಸವ ವಸತಿ ಯೋಜನೆ / ಡಾ. ಬಿ.ಆರ್. ಅಂಬೇಡ್ಕರ್ ನಿವಾಸ ಯೋಜನೆ",
    category: "Housing",
    level: "Karnataka State",
    department: "Rajiv Gandhi Housing Corporation Limited (RGHCL), Govt of Karnataka",
    portalName: "Ashraya Housing Portal",
    whoCanApply: "Homeless and kutcha-house dwelling rural and urban BPL families in Karnataka.",
    eligibilityCriteria: [
      "Must be a permanent resident of Karnataka belonging to BPL category.",
      "Must not own a pucca permanent concrete house anywhere in the state.",
      "Must own a small residential site or vacant kutcha homestead in rural or semi-urban area.",
      "Annual family income must not exceed ₹1,20,000 for rural or ₹1,50,000 for urban applicants."
    ],
    eligibilityRules: {
      rationCardRequired: ["BPL", "AAY"],
      maxAnnualIncome: 120000,
      minAge: 21,
      stateOnly: "Karnataka"
    },
    benefits: [
      "Financial construction subsidy of ₹1.20 Lakh (General/OBC) to ₹1.75 Lakh - ₹2.0 Lakh (SC/ST).",
      "Geo-tagged stage-wise DBT payments directly into bank account (Foundation, Lintel, Roof, Completion).",
      "Additional 90 person-days of wage labor under MGNREGA for rural home construction.",
      "Free toilet construction incentive under Swachh Bharat Mission."
    ],
    requiredDocuments: [
      "Aadhaar Card of applicant and spouse",
      "BPL Ration Card",
      "Site Ownership Document (Hakku Patra, E-swathu, Khata, or Sale Deed)",
      "Income & Caste Certificate (Nadakacheri)",
      "Bank Passbook copy"
    ],
    applicationProcess: [
      "Submit application through Gram Panchayat in rural areas or ULB / City Municipality in urban areas.",
      "Apply online on ashraya.karnataka.gov.in or through Grama One centers.",
      "Verification by Panchayat Development Officer (PDO) and Gram Sabha approval.",
      "Geo-tagging of construction stages via RGHCL mobile app for installment release."
    ],
    officialWebsite: "https://ashraya.karnataka.gov.in",
    sourceName: "Rajiv Gandhi Housing Corporation Limited",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["basava vasathi", "housing", "ashraya", "bpl", "pucca house", "rural home", "karnataka"]
  },
  {
    id: "arivu-loan",
    name: "Arivu Education Loan Scheme",
    kannadaName: "ಅರಿವು ಶೈಕ್ಷಣಿಕ ಸಾಲ ಯೋಜನೆ",
    category: "Education",
    level: "Karnataka State",
    department: "Karnataka Minorities Development Corporation (KMDC)",
    portalName: "KMDC Online Portal",
    whoCanApply: "Religious minority students (Muslim, Christian, Jain, Buddhist, Sikh, Parsi) admitted to professional higher education courses via KEA (CET/NEET).",
    eligibilityCriteria: [
      "Must belong to religious minority communities (Muslim, Christian, Jain, Buddhist, Sikh, Parsi) domiciled in Karnataka.",
      "Must have secured admission through Karnataka Examination Authority (KEA) CET or NEET into MBBS, BDS, BE, B.Tech, B.Arch, MBA, MCA, M.Tech, or AYUSH courses.",
      "Annual family income must not exceed ₹3,50,000 per annum."
    ],
    eligibilityRules: {
      studentRequired: true,
      minAge: 17,
      maxAge: 30,
      maxAnnualIncome: 350000,
      educationRequired: ["PUC/12th", "Diploma", "Graduate"],
      stateOnly: "Karnataka"
    },
    benefits: [
      "Concessional soft educational loan up to ₹1,00,000 to ₹5,00,000 per year covering full tuition fees.",
      "Ultra-low subsidized interest rate of only 2% per annum.",
      "Repayment commences only after course completion and a 1-year moratorium period.",
      "Direct digital disbursement to the educational institution via KEA."
    ],
    requiredDocuments: [
      "KEA Admission Order & Seat Allotment Letter",
      "SSLC and PUC Marks Cards",
      "Minority & Income Certificate from Tahsildar (RD Number)",
      "Aadhaar Card of student and parent",
      "Bank Passbook details"
    ],
    applicationProcess: [
      "Apply online at kmdc.karnataka.gov.in or via Seva Sindhu.",
      "Enter KEA CET/NEET roll number and Nadakacheri RD numbers.",
      "KMDC verifies details with KEA and issues soft sanction.",
      "Sign loan agreement and fee is paid directly to the allocated college."
    ],
    officialWebsite: "https://kmdc.karnataka.gov.in",
    sourceName: "Karnataka Minorities Development Corporation",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["arivu", "education loan", "minorities", "cet", "neet", "engineering", "medical", "karnataka"]
  },
  {
    id: "sandhya-suraksha",
    name: "Sandhya Suraksha Yojana",
    kannadaName: "ಸಂಧ್ಯಾ ಸುರಕ್ಷಾ ಯೋಜನೆ",
    category: "Senior Citizens",
    level: "Karnataka State",
    department: "Directorate of Social Security and Pensions, Revenue Dept, Govt of Karnataka",
    portalName: "Nadakacheri Janasnehi Portal",
    whoCanApply: "Destitute and low-income senior citizens of Karnataka aged 65 years and older.",
    eligibilityCriteria: [
      "Applicant must have attained the age of 65 years or above.",
      "Must be a permanent resident of Karnataka for at least 3 years.",
      "Combined annual income of the senior citizen and spouse must not exceed ₹20,000 per annum (BPL benchmark).",
      "Must not be a recipient of any other central, state, or private pension."
    ],
    eligibilityRules: {
      minAge: 65,
      maxAge: 110,
      maxAnnualIncome: 120000,
      rationCardRequired: ["BPL", "AAY"],
      stateOnly: "Karnataka"
    },
    benefits: [
      "Monthly pension of ₹1,200 deposited directly into the senior citizen's bank or post office account via DBT.",
      "Concessional bus pass issued by KSRTC/BMTC for subsidized travel across Karnataka.",
      "Access to free treatment and medical health checkups in government hospitals."
    ],
    requiredDocuments: [
      "Age Proof Certificate (Aadhaar Card, Voter ID, or School Certificate)",
      "Income & Residence Certificate from Nadakacheri",
      "BPL Ration Card",
      "Bank / Post Office Passbook with Aadhaar link",
      "Passport photographs"
    ],
    applicationProcess: [
      "Submit application through Nadakacheri (Atalji Janasnehi Kendra) or nearest Grama One / Karnataka One center.",
      "Verification by Village Accountant and Revenue Inspector.",
      "Sanction order issued by the Tahsildar.",
      "Monthly pension starts automatically via Electronic Benefit Transfer (EBT)."
    ],
    officialWebsite: "https://nadakacheri.karnataka.gov.in",
    sourceName: "Revenue Department, Karnataka",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["sandhya suraksha", "senior citizens", "old age pension", "pension", "nadakacheri", "karnataka"]
  },
  {
    id: "mythri-scheme",
    name: "Mythri Scheme (Transgender Assistance)",
    kannadaName: "ಮೈತ್ರಿ ಯೋಜನೆ (ತೃತೀಯ ಲಿಂಗಿ ಮಾಸಾಶನ)",
    category: "Social Security",
    level: "Karnataka State",
    department: "Directorate of Social Security and Pensions, Revenue Department, Karnataka",
    portalName: "Nadakacheri Portal",
    whoCanApply: "Transgender individuals residing in Karnataka from economically disadvantaged backgrounds.",
    eligibilityCriteria: [
      "Must be a transgender individual domiciled in Karnataka.",
      "Minimum age of 18 years.",
      "Annual income should be below the poverty threshold (BPL standard).",
      "Should hold a Transgender Identity Certificate issued by District Administration or National Transgender Portal."
    ],
    eligibilityRules: {
      gender: ["Transgender"],
      minAge: 18,
      maxAge: 100,
      maxAnnualIncome: 150000,
      stateOnly: "Karnataka"
    },
    benefits: [
      "Monthly financial pension of ₹1,200 deposited directly via DBT into bank account.",
      "Skill development training and priority under livelihood programs.",
      "Identity verification and protection under Karnataka State Transgender Policy."
    ],
    requiredDocuments: [
      "Transgender Identity Card / Certificate issued by District Magistrate",
      "Aadhaar Card",
      "Income Certificate from Nadakacheri",
      "Bank Account details",
      "BPL Ration Card (if available)"
    ],
    applicationProcess: [
      "Apply through Nadakacheri or District Social Welfare Officer.",
      "Submit TG Identity Certificate and basic residential proof.",
      "Sanctioned by the Tahsildar with monthly DBT disbursement."
    ],
    officialWebsite: "https://nadakacheri.karnataka.gov.in",
    sourceName: "Directorate of Social Security, Karnataka",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["mythri", "transgender", "social security", "pension", "lgbtq", "karnataka"]
  },
  {
    id: "manasvini-scheme",
    name: "Manasvini Scheme",
    kannadaName: "ಮನಸ್ವಿನಿ ಯೋಜನೆ",
    category: "Women",
    level: "Karnataka State",
    department: "Directorate of Social Security and Pensions, Revenue Dept, Karnataka",
    portalName: "Nadakacheri Portal",
    whoCanApply: "Unmarried women aged 40+, divorced women, or deserted wives from BPL families in Karnataka.",
    eligibilityCriteria: [
      "Unmarried women who have completed 40 years of age, or divorced/deserted women of any age.",
      "Must be residing below the poverty line (BPL card holder).",
      "Annual family income must not exceed ₹32,000 in rural or ₹40,000 in urban areas.",
      "Must not be drawing any other government pension."
    ],
    eligibilityRules: {
      gender: ["Female"],
      minAge: 40,
      maxAnnualIncome: 120000,
      rationCardRequired: ["BPL", "AAY"],
      stateOnly: "Karnataka"
    },
    benefits: [
      "Monthly financial pension of ₹1,200 via direct bank transfer.",
      "Provides dignity, food security, and social safety net for vulnerable women.",
      "Access to subsidised healthcare in government district hospitals."
    ],
    requiredDocuments: [
      "Age proof document (Aadhaar / Voter ID)",
      "BPL Ration Card",
      "Income certificate from Nadakacheri",
      "Divorce decree from court OR Desertion certificate from Village Accountant / Tahsildar",
      "Bank Passbook"
    ],
    applicationProcess: [
      "Submit application at Nadakacheri (AJSK) or Grama One / Karnataka One center.",
      "Verification by Revenue Inspector and Village Accountant.",
      "Pension approval issued by the Taluk Tahsildar."
    ],
    officialWebsite: "https://nadakacheri.karnataka.gov.in",
    sourceName: "Revenue Department, Karnataka",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["manasvini", "women", "deserted women", "unmarried", "pension", "bpl", "karnataka"]
  },
  {
    id: "karnataka-fruits",
    name: "Karnataka FRUITS Portal (Farmer Unified Service Portal)",
    kannadaName: "ಕರ್ನಾಟಕ ಫ್ರೂಟ್ಸ್ ಪೋರ್ಟಲ್ (ರೈತರ ಏಕೀಕೃತ ತಂತ್ರಾಂಶ)",
    category: "Agriculture",
    level: "Karnataka State",
    department: "e-Governance & Agriculture Department, Govt of Karnataka",
    portalName: "FRUITS Portal",
    whoCanApply: "All agricultural, horticultural, sericulture, and livestock farmers owning land in Karnataka.",
    eligibilityCriteria: [
      "Must own agricultural or allied land in Karnataka with active RTC/Pahani record.",
      "Open to small, marginal, and large agricultural landholders."
    ],
    eligibilityRules: {
      farmerRequired: true,
      minAge: 18,
      stateOnly: "Karnataka"
    },
    benefits: [
      "Unique Farmer ID (FID) serving as a single-window digital identity for all Karnataka agricultural benefits.",
      "Automatic qualification and document-free processing for PM-KISAN, crop insurance (Samrakshane), seed subsidies, and farm equipment loans.",
      "No need to carry physical land RTC copies to different government departments."
    ],
    requiredDocuments: [
      "Land RTC / Pahani with survey numbers",
      "Aadhaar Card",
      "Aadhaar-seeded Bank Passbook",
      "Mobile number"
    ],
    applicationProcess: [
      "Visit fruits.karnataka.gov.in or visit nearest Raitha Samparka Kendra (RSK) / Grama One.",
      "Enter Aadhaar and land RTC details; system fetches ownership from Bhoomi database.",
      "Receive 10-digit unique Farmer ID (FID) on registered mobile number."
    ],
    officialWebsite: "https://fruits.karnataka.gov.in",
    sourceName: "Centre for e-Governance, Karnataka",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["fruits", "farmer id", "agriculture", "bhoomi", "rtc", "pahani", "fid", "karnataka"]
  },

  // ==================== GOVERNMENT OF INDIA SCHEMES (AVAILABLE IN KARNATAKA) ====================
  {
    id: "pm-kisan",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    kannadaName: "ಪಿಎಂ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ",
    category: "Agriculture",
    level: "Government of India",
    department: "Ministry of Agriculture & Farmers Welfare, GoI (Integrated with Karnataka FRUITS)",
    portalName: "PM-KISAN Portal & Karnataka FRUITS",
    whoCanApply: "All landholding farmer families across Karnataka who own cultivable land.",
    eligibilityCriteria: [
      "Farmer family must own cultivable agricultural land registered in land records (Bhoomi/RTC).",
      "Institutional landholders and institutional farming bodies are excluded.",
      "Exclusions: Former/present constitutional post holders, MPs, MLAs, mayors, serving or retired government employees (except multi-tasking staff/Class IV), professionals (doctors, engineers, lawyers, CAs), and income tax payers."
    ],
    eligibilityRules: {
      farmerRequired: true,
      minAge: 18,
      taxPayerAllowed: false,
      occupationExcluded: ["Govt Employee", "Income Tax Payer"]
    },
    benefits: [
      "₹6,000 per year paid in three equal 4-monthly installments of ₹2,000 each.",
      "Direct DBT credit straight into Aadhaar-seeded bank account.",
      "Seamless integration with Karnataka's FRUITS portal for automatic eligibility verification."
    ],
    requiredDocuments: [
      "Land Record RTC / Pahani (verified through Bhoomi)",
      "FRUITS FID Number (Karnataka)",
      "Aadhaar Card with mandatory e-KYC completed",
      "Aadhaar-seeded active bank account"
    ],
    applicationProcess: [
      "Register directly on pmkisan.gov.in ('New Farmer Registration') or through Karnataka FRUITS portal.",
      "Ensure e-KYC is completed via Aadhaar OTP on the PM-KISAN portal or face-authentication mobile app.",
      "Village Agriculture Officer validates land ownership.",
      "Installments transferred on official national disbursement dates."
    ],
    officialWebsite: "https://pmkisan.gov.in",
    sourceName: "Ministry of Agriculture, Government of India",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["pm kisan", "farmer", "agriculture", "dbt", "6000", "central scheme", "fruits"]
  },
  {
    id: "pmfby-samrakshane",
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY / Samrakshane)",
    kannadaName: "ಪ್ರಧಾನ ಮಂತ್ರಿ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ (ಸಂರಕ್ಷಣೆ)",
    category: "Agriculture",
    level: "Government of India",
    department: "Ministry of Agriculture, GoI & Department of Agriculture, Govt of Karnataka",
    portalName: "Karnataka Samrakshane Portal",
    whoCanApply: "All farmers (loanee and non-loanee, sharecroppers, tenant farmers) growing notified crops in Karnataka.",
    eligibilityCriteria: [
      "Farmers growing notified Kharif and Rabi crops in notified gram panchayat / hobli areas in Karnataka.",
      "Must have an insurable interest in the notified crop.",
      "Enrollment must be completed within the notified seasonal cut-off date."
    ],
    eligibilityRules: {
      farmerRequired: true,
      minAge: 18
    },
    benefits: [
      "Comprehensive insurance cover against crop failure due to drought, unseasonal rainfall, floods, pests, and natural disasters.",
      "Ultra-low farmer premium: Only 2% of sum insured for Kharif crops, 1.5% for Rabi food grains, and 5% for annual commercial/horticultural crops.",
      "Remaining substantial premium subsidized by Karnataka Government and Central Government.",
      "Post-harvest localized calamity loss coverage up to 14 days after harvesting."
    ],
    requiredDocuments: [
      "Karnataka FRUITS FID Number",
      "Pahani / RTC showing current crop",
      "Aadhaar Card",
      "Bank Passbook copy",
      "Sowing Certificate from Village Accountant (for non-loanee farmers)"
    ],
    applicationProcess: [
      "Apply through Karnataka's official Samrakshane portal (samrakshane.karnataka.gov.in).",
      "Can also enroll at nearest Raitha Samparka Kendra (RSK), Grama One, or designated bank branch.",
      "Pay nominal farmer share premium before cutoff date.",
      "Direct claim settlement to bank account based on Crop Cutting Experiments (CCE) and automated weather stations."
    ],
    officialWebsite: "https://samrakshane.karnataka.gov.in",
    sourceName: "Karnataka Agriculture Dept & Ministry of Agriculture GoI",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["crop insurance", "pmfby", "samrakshane", "agriculture", "farmer", "drought", "compensation"]
  },
  {
    id: "pm-mudra",
    name: "Pradhan Mantri MUDRA Yojana (PMMY)",
    kannadaName: "ಪ್ರಧಾನ ಮಂತ್ರಿ ಮುದ್ರಾ ಯೋಜನೆ",
    category: "Entrepreneurship",
    level: "Government of India",
    department: "Department of Financial Services, Ministry of Finance, Govt of India",
    portalName: "Udyamimitra & Mudra Portal",
    whoCanApply: "Micro-entrepreneurs, small shopkeepers, artisans, street vendors, small manufacturers, and startups in Karnataka.",
    eligibilityCriteria: [
      "Any Indian citizen residing in Karnataka with a viable business plan for non-farm income-generating activity.",
      "Manufacturing, processing, trading, retail, transport, food service, repair, or allied activities.",
      "Applicant must not be a defaulter with any commercial bank, cooperative bank, or financial institution."
    ],
    eligibilityRules: {
      minAge: 18,
      maxAge: 65,
      occupationAllowed: ["Self-employed", "Unemployed", "Daily Wage", "Farmer", "Private Employee"]
    },
    benefits: [
      "Collateral-free (no security required) business loans under 3 tiers:",
      "1. Shishu: Loans up to ₹50,000 (ideal for new small ventures).",
      "2. Kishore: Loans above ₹50,000 up to ₹5,00,000 (for business expansion).",
      "3. Tarun / Tarun Plus: Loans above ₹5,00,000 up to ₹10,00,000 (enhanced up to ₹20 Lakhs for established enterprises).",
      "Subsidized, competitive interest rates with flexible 3 to 5 year repayment terms.",
      "Issuance of MUDRA RuPay Debit Card for easy working capital withdrawal."
    ],
    requiredDocuments: [
      "Identity Proof (Aadhaar Card / Voter ID / Passport)",
      "Address Proof (Karnataka domicile proof)",
      "Business registration certificate, Udyam Registration, or trade license (if existing)",
      "Quotation of machinery/items to be purchased or business project outline",
      "Bank statement of last 6 months"
    ],
    applicationProcess: [
      "Apply online on the JanSamarth Portal (jansamarth.in) or Udyamimitra (udyamimitra.in).",
      "Or apply directly at any Public Sector Bank, Private Bank, Regional Rural Bank (Karnataka Gramin Bank, Karnataka Vikas Grameena Bank), or NBFC.",
      "Submit project details and choose loan tier.",
      "Sanctioned within 7 to 15 working days without any processing fee for Shishu loans."
    ],
    officialWebsite: "https://www.mudra.org.in",
    sourceName: "Micro Units Development & Refinance Agency (MUDRA)",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["mudra", "business loan", "collateral free", "startup", "entrepreneur", "shishu", "kishore", "tarun"]
  },
  {
    id: "pm-awas-yojana",
    name: "Pradhan Mantri Awas Yojana (PMAY Urban 2.0 & Gramin)",
    kannadaName: "ಪ್ರಧಾನ ಮಂತ್ರಿ ಆವಾಸ್ ಯೋಜನೆ (ನಗರ ಮತ್ತು ಗ್ರಾಮೀಣ)",
    category: "Housing",
    level: "Government of India",
    department: "MoHUA & Ministry of Rural Development, GoI (Partnered with Karnataka RGHCL)",
    portalName: "PMAY Urban & AwaasSoft Gramin",
    whoCanApply: "Economically Weaker Section (EWS) and Low-Income Group (LIG) families without a pucca house in Karnataka.",
    eligibilityCriteria: [
      "The beneficiary family must not own a pucca house in any part of India.",
      "Income criteria: EWS (household income up to ₹3,00,000 per year); LIG (income ₹3,00,001 to ₹6,00,000 per year).",
      "Female ownership or co-ownership of the house is mandatory for new acquisitions under EWS/LIG."
    ],
    eligibilityRules: {
      maxAnnualIncome: 300000,
      minAge: 21,
      maxAge: 70
    },
    benefits: [
      "Credit-Linked Subsidy Scheme (CLSS): Up to ₹2.67 Lakh interest subsidy on home loans.",
      "Beneficiary-Led Individual House Construction: Direct financial assistance of ₹1.5 Lakhs (Central) + State top-up subsidy for constructing own house.",
      "Affordable Housing in Partnership: Subsidized multi-storey flats built in urban centers like Bengaluru, Mysuru, Hubballi.",
      "Basic amenities included: Toilet, electricity connection, water supply, and LPG under Ujjwala."
    ],
    requiredDocuments: [
      "Aadhaar Card of all family members",
      "Income Certificate from competent state authority",
      "BPL Ration Card or EWS proof",
      "Land site title documents or Hakku Patra",
      "Bank Account details"
    ],
    applicationProcess: [
      "PMAY Urban: Apply online through pmaymis.gov.in or Common Service Centers (CSC) / Karnataka One.",
      "PMAY Gramin: Beneficiary list generated through SECC / Awaas+ survey verified by Gram Sabha.",
      "Geo-tagged progress verification and direct DBT disbursement."
    ],
    officialWebsite: "https://pmaymis.gov.in",
    sourceName: "Ministry of Housing and Urban Affairs, GoI",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["pmay", "housing", "pucca house", "home loan subsidy", "urban", "gramin", "bpl"]
  },
  {
    id: "ayushman-bharat-ark",
    name: "Ayushman Bharat - Arogya Karnataka (AB-ArK / PM-JAY)",
    kannadaName: "ಆಯುಷ್ಮಾನ್ ಭಾರತ್ - ಆರೋಗ್ಯ ಕರ್ನಾಟಕ",
    category: "Healthcare",
    level: "Government of India",
    department: "Suvarna Arogya Suraksha Trust (SAST), Health & Family Welfare Dept, Karnataka & NHA",
    portalName: "Arogya Karnataka & PM-JAY Portal",
    whoCanApply: "All BPL/AAY families and general APL families residing in Karnataka.",
    eligibilityCriteria: [
      "Category A (Eligible): All BPL (Priority Household) and Antyodaya (AAY) ration card holders in Karnataka.",
      "Category B (General): APL ration card holders in Karnataka (co-payment model with 30% government assistance up to ₹1.5 Lakh)."
    ],
    eligibilityRules: {
      minAge: 0,
      maxAge: 100
    },
    benefits: [
      "Cashless health insurance coverage of up to ₹5,00,000 per family per year for secondary and tertiary healthcare.",
      "Covers 1,650+ surgical procedures, oncology/cancer care, cardiology, neurosurgery, and critical care.",
      "Cashless treatment at all government hospitals and 500+ accredited private empaneled hospitals across Karnataka.",
      "Includes pre-hospitalization (3 days) and post-hospitalization (15 days) diagnostic and medicine expenses."
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Ration Card (BPL / Antyodaya / APL card)",
      "Ayushman Arogya Card / ABHA ID (Ayushman Bharat Health Account)"
    ],
    applicationProcess: [
      "Visit any Taluk Government Hospital, District Hospital, or Karnataka One / Bangalore One center.",
      "Provide Aadhaar and Ration Card to the 'Arogya Mitra' desk.",
      "Arogya Mitra issues the laminated Ayushman Arogya Card.",
      "Show card at any empaneled hospital for instant cashless admission."
    ],
    officialWebsite: "https://arogya.karnataka.gov.in",
    sourceName: "Suvarna Arogya Suraksha Trust & National Health Authority",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["ayushman bharat", "arogya karnataka", "pmjay", "health insurance", "hospital", "cashless", "5 lakh"]
  },
  {
    id: "national-scholarship-portal",
    name: "National Scholarship Portal (NSP) Schemes",
    kannadaName: "ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್ (NSP)",
    category: "Students",
    level: "Government of India",
    department: "Ministry of Electronics & IT / Ministry of Education / Minority Affairs, GoI",
    portalName: "National Scholarship Portal",
    whoCanApply: "Indian students in Karnataka from pre-matric to doctoral level fulfilling respective ministry merit and means criteria.",
    eligibilityCriteria: [
      "Must be enrolled in a recognized institution listed on AISHE (All India Survey on Higher Education).",
      "Specific criteria vary: Central Sector Scheme requires 80th percentile in 12th board; Pragati Scholarship for girl students in technical degrees; Ishan Uday, etc.",
      "Family income ceilings typically ₹2.5 Lakhs to ₹4.5 Lakhs per year depending on the specific central scheme."
    ],
    eligibilityRules: {
      studentRequired: true,
      minAge: 12,
      maxAge: 30,
      maxAnnualIncome: 450000,
      educationRequired: ["SSLC/10th", "PUC/12th", "Diploma", "Graduate", "Post Graduate"]
    },
    benefits: [
      "Annual scholarship awards ranging from ₹10,000 to ₹50,000 per year directly to student accounts.",
      "Covers maintenance allowance, books, equipment, and full tuition fees.",
      "Transparent direct DBT distribution across all Indian universities."
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Marksheet of previous qualifying exam",
      "Bonafide Student Certificate from College / School",
      "Income Certificate",
      "Bank Account details seeded with Aadhaar"
    ],
    applicationProcess: [
      "Visit scholarships.gov.in and register on National Scholarship Portal with OTR (One Time Registration).",
      "Select applicable Central Sector or Ministry scheme.",
      "Upload documents and submit to institutional verification desk.",
      "Head of Institution verifies online; funds released via DBT."
    ],
    officialWebsite: "https://scholarships.gov.in",
    sourceName: "Ministry of Education & MeitY, GoI",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["nsp", "scholarship", "students", "central scheme", "higher education", "merit"]
  },
  {
    id: "pmkvy",
    name: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)",
    kannadaName: "ಪ್ರಧಾನ ಮಂತ್ರಿ ಕೌಶಲ್ಯ ವಿಕಾಸ ಯೋಜನೆ 4.0",
    category: "Skill Development",
    level: "Government of India",
    department: "Ministry of Skill Development & Entrepreneurship (MSDE), GoI",
    portalName: "Skill India Digital Portal",
    whoCanApply: "Unemployed youth, school/college dropouts seeking fast-track industry vocational credentials.",
    eligibilityCriteria: [
      "Indian citizen aged between 15 and 45 years.",
      "Basic literacy matching the qualification pack requirement.",
      "Seeking skill upgradation or certification of existing informal skills (Recognition of Prior Learning - RPL)."
    ],
    eligibilityRules: {
      minAge: 15,
      maxAge: 45
    },
    benefits: [
      "Completely free skill training covering futuristic technologies (Industry 4.0, AI, Robotics, Drones, IoT, Green Hydrogen) and traditional sectors.",
      "Government-recognized Skill India NSDC Certification.",
      "Monetary assessment stipend and accidental insurance during training.",
      "Job placement support and apprenticeship pairing."
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Educational Marksheet",
      "Bank Account details",
      "Passport photograph"
    ],
    applicationProcess: [
      "Visit skillindiadigital.gov.in.",
      "Explore courses and locate nearest Pradhan Mantri Kaushal Kendra (PMKK) in Karnataka.",
      "Enroll online and complete classroom and practical workshop hours.",
      "Pass final third-party assessment to obtain certificate and placement aid."
    ],
    officialWebsite: "https://www.skillindiadigital.gov.in",
    sourceName: "National Skill Development Corporation (NSDC)",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["pmkvy", "skill india", "vocational", "nsdc", "youth", "training", "free"]
  },
  {
    id: "pm-svanidhi",
    name: "PM SVANidhi (Street Vendor's AtmaNirbhar Nidhi)",
    kannadaName: "ಪಿಎಂ ಸ್ವನಿಧಿ (ಬೀದಿ ಬದಿ ವ್ಯಾಪಾರಿಗಳ ಸ್ವಾವಲಂಬನೆ ನಿಧಿ)",
    category: "Financial Assistance",
    level: "Government of India",
    department: "Ministry of Housing and Urban Affairs (MoHUA), GoI",
    portalName: "PM SVANidhi Portal",
    whoCanApply: "Urban and peri-urban street vendors, cart pullers, and roadside sellers operating in Karnataka cities and towns.",
    eligibilityCriteria: [
      "Vendors operating in urban areas possessing a Certificate of Vending / ID card issued by Urban Local Bodies (BBMP, City Municipal Corporations, Town Panchayats).",
      "Vendors left out in surveys can obtain a Letter of Recommendation (LoR) from Town Vending Committee."
    ],
    eligibilityRules: {
      minAge: 18,
      occupationAllowed: ["Self-employed", "Daily Wage"]
    },
    benefits: [
      "Affordable working capital collateral-free loans in 3 progressive tranches:",
      "1st Tranche: Up to ₹10,000 (1 year repayment).",
      "2nd Tranche: Up to ₹20,000 on timely repayment of 1st loan.",
      "3rd Tranche: Up to ₹50,000 on timely repayment of 2nd loan.",
      "7% interest subsidy credited directly to bank account on timely repayment.",
      "Cashback incentives up to ₹1,200 per year for conducting digital transactions (UPI/QR code)."
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Vending ID Card or Letter of Recommendation (LoR) from Municipal Corporation",
      "Bank Account Passbook",
      "Active Mobile Number"
    ],
    applicationProcess: [
      "Visit pmsvanidhi.mohua.gov.in or apply through Bangalore One / Karnataka One / BBMP ward office.",
      "Enter Aadhaar and Vending ID number.",
      "Choose preferred lender bank or microfinance institution.",
      "Loan disbursed directly within a few days."
    ],
    officialWebsite: "https://pmsvanidhi.mohua.gov.in",
    sourceName: "Ministry of Housing and Urban Affairs, GoI",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["pm svanidhi", "street vendor", "loan", "working capital", "bbmp", "urban", "cashback"]
  },
  {
    id: "sukanya-samriddhi",
    name: "Sukanya Samriddhi Yojana (SSY)",
    kannadaName: "ಸುಕನ್ಯಾ ಸಮೃದ್ಧಿ ಯೋಜನೆ",
    category: "Financial Assistance",
    level: "Government of India",
    department: "Department of Posts & Ministry of Finance, Govt of India",
    portalName: "India Post & National Banks",
    whoCanApply: "Parents or legal guardians of a girl child resident in Karnataka aged 10 years or below.",
    eligibilityCriteria: [
      "Account can be opened by natural/legal guardians for a girl child from her birth up to age 10.",
      "Maximum of two accounts permitted per family (one for each girl child; exception for twins/triplets).",
      "Minimum annual deposit of ₹250; maximum ₹1,50,000 per financial year."
    ],
    eligibilityRules: {
      minAge: 18, // Guardian's age
      hasGirlChild: true
    },
    benefits: [
      "Highest government-backed small savings interest rate (8.2% per annum, compounded annually).",
      "Triple Tax Benefit (EEE): Investment exempt under 80C, interest earned is 100% tax-free, and final maturity amount is completely tax-free.",
      "Partial withdrawal up to 50% permitted after girl reaches 18 years for higher education.",
      "Account matures upon 21 years from opening date or on her marriage after age 18."
    ],
    requiredDocuments: [
      "Birth Certificate of the girl child",
      "Aadhaar Card and PAN Card of the parent / guardian",
      "Address proof (Aadhaar / Voter ID / Utility Bill)",
      "Initial deposit slip (minimum ₹250)"
    ],
    applicationProcess: [
      "Visit any Karnataka Post Office or authorized commercial bank branch (SBI, Canara Bank, Union Bank, etc.).",
      "Fill out the SSY account opening form.",
      "Submit copies of girl child birth certificate and guardian KYC.",
      "Receive passbook with account number; deposit funds offline or through IPPB / net banking."
    ],
    officialWebsite: "https://www.indiapost.gov.in",
    sourceName: "Department of Posts, Ministry of Finance, GoI",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["sukanya samriddhi", "girl child", "savings", "tax free", "education", "marriage", "post office"]
  },
  {
    id: "atal-pension",
    name: "Atal Pension Yojana (APY)",
    kannadaName: "ಅಟಲ್ ಪಿಂಚಣಿ ಯೋಜನೆ",
    category: "Senior Citizens",
    level: "Government of India",
    department: "Pension Fund Regulatory and Development Authority (PFRDA), Govt of India",
    portalName: "NPS Protean / Bank Branches",
    whoCanApply: "All Indian citizens in Karnataka aged 18 to 40 years, especially workers in the unorganized sector.",
    eligibilityCriteria: [
      "Open to any citizen of India between 18 and 40 years of age.",
      "Must have a savings bank account or post office savings account.",
      "Must not be an Income Tax payer (as per revised guidelines)."
    ],
    eligibilityRules: {
      minAge: 18,
      maxAge: 40,
      taxPayerAllowed: false,
      occupationExcluded: ["Govt Employee", "Income Tax Payer"]
    },
    benefits: [
      "Guaranteed monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 starting from the age of 60 until death.",
      "After the subscriber's demise, the same pension amount is guaranteed to the spouse for life.",
      "Upon demise of both subscriber and spouse, the entire accumulated pension wealth corpus (up to ₹8.5 Lakhs) is returned to the nominee.",
      "Auto-debit facility from savings account; flexible contribution frequencies (monthly, quarterly, half-yearly)."
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Savings Bank Account Passbook",
      "Active Mobile Number",
      "Nominee details"
    ],
    applicationProcess: [
      "Visit your home bank branch or post office where you have an active savings account.",
      "Or register instantly via Net Banking / Mobile Banking of major banks (Canara Bank, SBI, Bank of Baroda, etc.).",
      "Choose desired monthly pension target (e.g., ₹5,000/month) and nominee.",
      "Auto-debit authorization is established; receive APY PRAN number."
    ],
    officialWebsite: "https://www.npscra.nsdl.co.in",
    sourceName: "PFRDA, Ministry of Finance, GoI",
    lastVerifiedDate: "October 2024 (Active 2024-2026)",
    tags: ["atal pension", "apy", "pension", "retirement", "unorganized", "guaranteed pension", "pfrda"]
  }
];

// List of all 31 Districts in Karnataka
const KARNATAKA_DISTRICTS = [
  "Bagalkote",
  "Ballari",
  "Belagavi",
  "Bengaluru Rural",
  "Bengaluru Urban",
  "Bidar",
  "Chamarajanagar",
  "Chikkaballapura",
  "Chikkamagaluru",
  "Chitradurga",
  "Dakshina Kannada",
  "Davanagere",
  "Dharwad",
  "Gadag",
  "Hassan",
  "Haveri",
  "Kalaburagi",
  "Kodagu",
  "Kolar",
  "Koppal",
  "Mandya",
  "Mysuru",
  "Raichur",
  "Ramanagara",
  "Shivamogga",
  "Tumakuru",
  "Udupi",
  "Uttara Kannada",
  "Vijayanagara",
  "Vijayapura",
  "Yadgir"
];

// Scheme Categories
const SCHEME_CATEGORIES = [
  { id: "all", name: "All Schemes", icon: "📋" },
  { id: "Women", name: "Women & Child", icon: "👩" },
  { id: "Agriculture", name: "Agriculture & Farmers", icon: "🌾" },
  { id: "Employment", name: "Employment & Jobs", icon: "💼" },
  { id: "Students", name: "Students & Youth", icon: "👨‍🎓" },
  { id: "Education", name: "Education & Loans", icon: "🎓" },
  { id: "Skill Development", name: "Skill Training", icon: "🛠️" },
  { id: "Financial Assistance", name: "Financial Support & DBT", icon: "💰" },
  { id: "Housing", name: "Housing & Shelter", icon: "🏠" },
  { id: "Healthcare", name: "Healthcare & Insurance", icon: "🏥" },
  { id: "Senior Citizens", name: "Senior Citizens", icon: "👴" },
  { id: "Social Security", name: "Social Security & Welfare", icon: "♿" },
  { id: "Entrepreneurship", name: "Business & MSME", icon: "🚀" }
];
