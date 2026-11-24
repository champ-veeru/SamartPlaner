/**
 * SmartFin - Karnataka & Central Government Scheme Eligibility Engine
 * Rigorously evaluates user profile against official government eligibility criteria.
 * 
 * Status Categories:
 * 🟢 Likely Eligible
 * 🟡 May Be Eligible – Check Requirements
 * 🔴 Does Not Appear Eligible
 */

const EligibilityEngine = {
  /**
   * Evaluate a single scheme against a user profile
   * @param {Object} profile 
   * @param {Object} scheme 
   * @returns {Object} Detailed evaluation result
   */
  evaluateScheme(profile, scheme) {
    const rules = scheme.eligibilityRules || {};
    const matched = [];
    const missing = [];
    const notes = [];

    let isStrictMismatch = false;
    let score = 0;
    let totalFactors = 0;

    // 1. State / Residency check
    if (rules.stateOnly) {
      totalFactors++;
      if (profile.state === rules.stateOnly || !profile.state) {
        matched.push("Karnataka domicile / residency requirement satisfied");
        score++;
      } else {
        missing.push(`Requires permanent residency in ${rules.stateOnly}`);
        isStrictMismatch = true;
      }
    }

    // 2. Gender check
    if (rules.gender && rules.gender.length > 0) {
      totalFactors++;
      if (rules.gender.includes(profile.gender)) {
        matched.push(`Gender requirement (${profile.gender}) satisfied`);
        score++;
      } else {
        missing.push(`Scheme is exclusively for: ${rules.gender.join(", ")} (User is ${profile.gender})`);
        isStrictMismatch = true;
      }
    }

    // 3. Age check
    if (rules.minAge !== undefined || rules.maxAge !== undefined) {
      totalFactors++;
      const userAge = Number(profile.age) || 0;
      const minOk = rules.minAge === undefined || userAge >= rules.minAge;
      const maxOk = rules.maxAge === undefined || userAge <= rules.maxAge;

      if (minOk && maxOk) {
        matched.push(`Age (${userAge} yrs) falls within eligible bracket (${rules.minAge || 0} to ${rules.maxAge || 100} yrs)`);
        score++;
      } else {
        missing.push(`Age (${userAge} yrs) outside required bracket (${rules.minAge || 0} to ${rules.maxAge || 100} yrs)`);
        isStrictMismatch = true;
      }
    }

    // 4. Annual Income check
    if (rules.maxAnnualIncome !== undefined) {
      totalFactors++;
      const userIncome = Number(profile.annualIncome) || 0;
      if (userIncome <= rules.maxAnnualIncome) {
        matched.push(`Family income (₹${userIncome.toLocaleString("en-IN")}) is within ceiling (₹${rules.maxAnnualIncome.toLocaleString("en-IN")})`);
        score++;
      } else {
        missing.push(`Income (₹${userIncome.toLocaleString("en-IN")}) exceeds ceiling of ₹${rules.maxAnnualIncome.toLocaleString("en-IN")}`);
        isStrictMismatch = true;
      }
    }

    // 5. Farmer requirement
    if (rules.farmerRequired) {
      totalFactors++;
      const isFarmer = profile.farmerStatus && profile.farmerStatus !== "Non-Farmer";
      if (isFarmer) {
        matched.push(`Applicant is a verified farmer (${profile.farmerStatus})`);
        score++;
      } else {
        missing.push("Scheme requires agricultural landholder / active farmer status");
        isStrictMismatch = true;
      }
    }

    // 6. Student requirement
    if (rules.studentRequired) {
      totalFactors++;
      const isStudent = profile.employmentStatus === "Student" || profile.occupation === "Student";
      if (isStudent) {
        matched.push("Currently enrolled as a student in recognized institution");
        score++;
      } else {
        missing.push("Requires active student enrollment in recognized school/college");
        isStrictMismatch = true;
      }
    }

    // 7. Employment / Unemployment requirement
    if (rules.employmentStatus && rules.employmentStatus.length > 0) {
      totalFactors++;
      if (rules.employmentStatus.includes(profile.employmentStatus)) {
        matched.push(`Employment status (${profile.employmentStatus}) matches scheme criteria`);
        score++;
      } else {
        missing.push(`Requires employment status to be: ${rules.employmentStatus.join(", ")}`);
        // If scheme is Yuva Nidhi and user is employed, it is mismatch
        isStrictMismatch = true;
      }
    }

    // 8. Education requirement
    if (rules.educationRequired && rules.educationRequired.length > 0) {
      totalFactors++;
      if (rules.educationRequired.includes(profile.education)) {
        matched.push(`Education level (${profile.education}) satisfies course requirements`);
        score++;
      } else {
        notes.push(`Prefers education: ${rules.educationRequired.join(", ")}`);
      }
    }

    // 9. Ration card requirement (BPL/AAY)
    if (rules.rationCardRequired && rules.rationCardRequired.length > 0) {
      totalFactors++;
      if (rules.rationCardRequired.includes(profile.rationCardType)) {
        matched.push(`Ration card type (${profile.rationCardType}) meets welfare priority`);
        score++;
      } else {
        if (rules.rationCardRequired.includes("BPL") && profile.rationCardType === "APL") {
          missing.push(`Requires Priority BPL / Antyodaya (AAY) ration card (User holds ${profile.rationCardType})`);
          isStrictMismatch = true;
        } else {
          notes.push(`Preferred ration card: ${rules.rationCardRequired.join(", ")}`);
        }
      }
    }

    // 10. Tax Payer restriction
    if (rules.taxPayerAllowed === false) {
      totalFactors++;
      if (!profile.taxPayer) {
        matched.push("Non-taxpayer criteria met (Government DBT prerequisite)");
        score++;
      } else {
        missing.push("Income tax payers are legally excluded from this subsidy");
        isStrictMismatch = true;
      }
    }

    // 11. Occupation exclusions
    if (rules.occupationExcluded && rules.occupationExcluded.length > 0) {
      if (rules.occupationExcluded.includes(profile.occupation)) {
        missing.push(`Occupation (${profile.occupation}) is explicitly excluded from this welfare benefit`);
        isStrictMismatch = true;
      }
    }

    // 12. Girl Child requirement (Sukanya Samriddhi)
    if (rules.hasGirlChild) {
      totalFactors++;
      if (profile.hasGirlChildUnder10) {
        matched.push("Parent/Guardian has girl child under 10 years of age");
        score++;
      } else {
        missing.push("Requires having a biological or adopted daughter under 10 years old");
        isStrictMismatch = true;
      }
    }

    // Calculate match percentage and final badge category
    const matchPercentage = totalFactors > 0 ? Math.round((score / totalFactors) * 100) : 70;

    let status = "maybe";
    let badge = "🟡 May Be Eligible – Check Requirements";
    let badgeClass = "badge-maybe";

    if (isStrictMismatch) {
      status = "unlikely";
      badge = "🔴 Does Not Appear Eligible";
      badgeClass = "badge-unlikely";
    } else if (matchPercentage >= 75 && missing.length === 0) {
      status = "likely";
      badge = "🟢 Likely Eligible";
      badgeClass = "badge-likely";
    } else {
      status = "maybe";
      badge = "🟡 May Be Eligible – Check Requirements";
      badgeClass = "badge-maybe";
    }

    return {
      schemeId: scheme.id,
      scheme,
      status,
      badge,
      badgeClass,
      matchPercentage,
      matched,
      missing,
      notes
    };
  },

  /**
   * Evaluate all schemes in the database against the user profile
   * @param {Object} profile 
   * @param {Array} schemes 
   * @returns {Array} Evaluated schemes sorted by eligibility priority
   */
  evaluateAllSchemes(profile, schemes = SCHEMES_DATABASE) {
    const results = schemes.map(scheme => this.evaluateScheme(profile, scheme));

    // Sort order: Likely Eligible (🟢) -> May Be Eligible (🟡) -> Does Not Appear Eligible (🔴)
    const priorityWeight = {
      likely: 3,
      maybe: 2,
      unlikely: 1
    };

    return results.sort((a, b) => {
      if (priorityWeight[b.status] !== priorityWeight[a.status]) {
        return priorityWeight[b.status] - priorityWeight[a.status];
      }
      return b.matchPercentage - a.matchPercentage;
    });
  },

  /**
   * Filter evaluated schemes by various user criteria
   */
  filterSchemes(evaluatedSchemes, {
    category = "all",
    searchQuery = "",
    status = "all",
    level = "all",
    district = ""
  } = {}) {
    return evaluatedSchemes.filter(item => {
      const scheme = item.scheme;

      // Category filter
      if (category !== "all" && scheme.category !== category) {
        return false;
      }

      // Status filter (likely, maybe, unlikely)
      if (status !== "all" && item.status !== status) {
        return false;
      }

      // Level filter (Karnataka State vs Government of India)
      if (level !== "all") {
        if (level === "karnataka" && scheme.level !== "Karnataka State") return false;
        if (level === "central" && scheme.level !== "Government of India") return false;
      }

      // Search Query filter (matches name, kannadaName, department, tags, whoCanApply)
      if (searchQuery && searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const searchableText = [
          scheme.name,
          scheme.kannadaName,
          scheme.department,
          scheme.whoCanApply,
          scheme.category,
          ...(scheme.tags || [])
        ].join(" ").toLowerCase();

        if (!searchableText.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }
};
