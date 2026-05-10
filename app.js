const drugs = [
  { name: "Penicillin", className: "Penicillin", group: "natural-penicillin", family: "penicillin" },
  { name: "Nafcillin/Oxacillin", className: "Penicillin", group: "anti-staph-penicillin", family: "penicillin" },
  { name: "Dicloxacillin", className: "Penicillin", group: "anti-staph-penicillin", family: "penicillin" },
  { name: "Amoxicillin", className: "Penicillin", group: "amoxicillin-like", family: "penicillin", route: "po" },
  { name: "Ampicillin", className: "Penicillin", group: "ampicillin-like", family: "penicillin" },
  { name: "Piperacillin", className: "Penicillin", group: "piperacillin-like", family: "penicillin" },
  { name: "Cefadroxil", className: "1st gen cephalosporin", group: "amoxicillin-like", family: "aminopenicillin-side-chain", route: "po" },
  { name: "Cephalexin", className: "1st gen cephalosporin", group: "ampicillin-like", family: "aminopenicillin-side-chain", route: "po" },
  { name: "Cefazolin", className: "1st gen cephalosporin", group: "cefazolin-unique", family: "cefazolin-unique" },
  { name: "Cefaclor", className: "2nd gen cephalosporin", group: "ampicillin-like", family: "aminopenicillin-side-chain", route: "po" },
  { name: "Cefoxitin", className: "2nd gen cephalosporin", group: "cefoxitin-like", family: "cephamycin" },
  { name: "Cefprozil", className: "2nd gen cephalosporin", group: "amoxicillin-like", family: "aminopenicillin-side-chain", route: "po" },
  { name: "Cefuroxime", className: "2nd gen cephalosporin", group: "cefuroxime-like", family: "methoxyimino" },
  { name: "Cefdinir", className: "3rd gen cephalosporin", group: "cefdinir-like", family: "methoxyimino", route: "po" },
  { name: "Cefixime", className: "3rd gen cephalosporin", group: "cefixime-like", family: "methoxyimino", route: "po" },
  { name: "Cefotaxime", className: "3rd gen cephalosporin", group: "cefotaxime-like", family: "methoxyimino" },
  { name: "Cefpodoxime", className: "3rd gen cephalosporin", group: "cefotaxime-like", family: "methoxyimino" },
  { name: "Ceftazidime", className: "3rd gen cephalosporin", group: "ceftazidime-aztreonam", family: "oxyimino" },
  { name: "Ceftriaxone", className: "3rd gen cephalosporin", group: "cefotaxime-like", family: "methoxyimino" },
  { name: "Cefepime", className: "4th gen cephalosporin", group: "cefotaxime-like", family: "methoxyimino" },
  { name: "Ceftaroline", className: "Advanced cephalosporin", group: "ceftaroline-like", family: "advanced-cephalosporin" },
  { name: "Ceftolozane", className: "Advanced cephalosporin", group: "ceftazidime-like", family: "oxyimino" },
  { name: "Cefiderocol", className: "Advanced cephalosporin", group: "cefiderocol-like", family: "advanced-cephalosporin" },
  { name: "Ertapenem", className: "Carbapenem", group: "carbapenem", family: "carbapenem" },
  { name: "Imipenem", className: "Carbapenem", group: "carbapenem", family: "carbapenem" },
  { name: "Meropenem", className: "Carbapenem", group: "carbapenem", family: "carbapenem" },
  { name: "Aztreonam", className: "Monobactam", group: "ceftazidime-aztreonam", family: "monobactam" },
];

const classOrder = [
  "Penicillin",
  "1st gen cephalosporin",
  "2nd gen cephalosporin",
  "3rd gen cephalosporin",
  "4th gen cephalosporin",
  "Advanced cephalosporin",
  "Carbapenem",
  "Monobactam",
];

const aliases = new Map([
  ["naf", "Nafcillin/Oxacillin"],
  ["nafcillin", "Nafcillin/Oxacillin"],
  ["oxacillin", "Nafcillin/Oxacillin"],
  ["erta", "Ertapenem"],
  ["ertapenem", "Ertapenem"],
  ["imipenem", "Imipenem"],
  ["mero", "Meropenem"],
  ["meropenem", "Meropenem"],
]);

const cautionPairs = new Map([
  ["Amoxicillin", ["Ampicillin", "Cephalexin", "Cefaclor"]],
  ["Ampicillin", ["Amoxicillin", "Cefadroxil", "Cefprozil"]],
  ["Cefadroxil", ["Ampicillin", "Cephalexin", "Cefaclor"]],
  ["Cephalexin", ["Amoxicillin", "Cefadroxil", "Cefprozil"]],
  ["Cefaclor", ["Amoxicillin", "Cefadroxil", "Cefprozil"]],
  ["Cefprozil", ["Ampicillin", "Cephalexin", "Cefaclor"]],
  ["Cefuroxime", ["Cefdinir", "Cefixime", "Cefotaxime", "Cefpodoxime", "Ceftriaxone", "Cefepime"]],
  ["Cefdinir", ["Cefuroxime", "Cefixime", "Cefotaxime", "Cefpodoxime", "Ceftriaxone", "Cefepime"]],
  ["Cefixime", ["Cefuroxime", "Cefdinir", "Cefotaxime", "Cefpodoxime", "Ceftriaxone", "Cefepime"]],
  ["Cefotaxime", ["Cefuroxime", "Cefdinir", "Cefixime"]],
  ["Cefpodoxime", ["Cefuroxime", "Cefdinir", "Cefixime"]],
  ["Ceftriaxone", ["Cefuroxime", "Cefdinir", "Cefixime"]],
  ["Cefepime", ["Cefuroxime", "Cefdinir", "Cefixime"]],
  ["Ceftazidime", ["Ceftolozane"]],
  ["Ceftolozane", ["Ceftazidime", "Aztreonam"]],
  ["Ceftaroline", ["Cefiderocol"]],
  ["Cefiderocol", ["Ceftaroline"]],
]);

const drugByKey = new Map(drugs.map((drug) => [keyFor(drug.name), drug]));
const drugByName = new Map(drugs.map((drug) => [drug.name, drug]));

function keyFor(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function findDrug(value) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const alias = aliases.get(trimmed.toLowerCase());
  return alias ? drugByKey.get(keyFor(alias)) : drugByKey.get(keyFor(trimmed));
}

function getRelationship(allergy, candidate) {
  if (allergy.name === candidate.name) {
    return {
      status: "avoid",
      reason: "Same drug",
      detail: "Reported allergy drug and candidate drug are identical.",
    };
  }

  if (allergy.className === "Penicillin" && candidate.className === "Penicillin") {
    return {
      status: "avoid",
      reason: "Same penicillin subclass",
      detail: "Treat penicillin-to-penicillin comparisons as avoid unless reviewed through an allergy pathway.",
    };
  }

  if (allergy.group === candidate.group && allergy.group !== "cefazolin-unique") {
    return {
      status: "avoid",
      reason: "Identical or closely matched R1/R2 side chain",
      detail: `${allergy.name} and ${candidate.name} share the ${readableGroup(allergy.group)} group.`,
    };
  }

  if (isCautionPair(allergy.name, candidate.name)) {
    return {
      status: "caution",
      reason: "Similar R1 ring or branch",
      detail: `${allergy.name} and ${candidate.name} are mapped as similar, but not identical, side-chain concerns.`,
    };
  }

  return {
    status: "suggest",
    reason: "Dissimilar R1/R2 side chain",
    detail: "Cross-reactivity is least likely by side-chain comparison.",
  };
}

function isCautionPair(firstName, secondName) {
  return (
    cautionPairs.get(firstName)?.includes(secondName) ||
    cautionPairs.get(secondName)?.includes(firstName) ||
    false
  );
}

function getRiskLists(allergy) {
  return drugs
    .filter((drug) => drug.name !== allergy.name)
    .map((drug) => ({ drug, relationship: getRelationship(allergy, drug) }))
    .filter((item) => item.relationship.status === "avoid" || item.relationship.status === "caution");
}

function groupedByClass(items) {
  return classOrder
    .map((className) => ({
      className,
      items: items.filter((item) => item.drug.className === className),
    }))
    .filter((group) => group.items.length > 0);
}

function readableGroup(group) {
  return group
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function renderResult() {
  const allergy = findDrug(document.querySelector("#allergyInput").value);
  const targetValue = document.querySelector("#targetInput").value;
  const target = findDrug(targetValue);
  const panel = document.querySelector("#resultPanel");

  if (!allergy) {
    panel.innerHTML = `
      <div class="empty-state">
        <h2>Choose a reported allergy</h2>
        <p>Start typing an antibiotic name to see AVOID and CAUTION drugs grouped by antibiotic class.</p>
      </div>
    `;
    return;
  }

  const riskItems = getRiskLists(allergy);
  const avoidGroups = groupedByClass(riskItems.filter((item) => item.relationship.status === "avoid"));
  const cautionGroups = groupedByClass(riskItems.filter((item) => item.relationship.status === "caution"));
  const targetReport = getTargetReport(allergy, target, targetValue);

  panel.innerHTML = `
    <section class="summary-band">
      <div>
        <p class="eyebrow">Reported allergy</p>
        <h2>${allergy.name}</h2>
      </div>
      <div class="summary-meta">
        <span>${allergy.className}</span>
        <span>${readableGroup(allergy.group)}</span>
      </div>
    </section>

    ${targetReport}

    <section class="risk-columns">
      ${renderRiskColumn("avoid", "AVOID", avoidGroups)}
      ${renderRiskColumn("caution", "CAUTION", cautionGroups)}
    </section>
  `;
}

function getTargetReport(allergy, target, targetValue) {
  if (!targetValue.trim()) return "";

  if (!target) {
    return `
      <section class="target-report review">
        <strong>Targeted drug report</strong>
        <span>Drug not found in current beta-lactam data table.</span>
      </section>
    `;
  }

  const relationship = getRelationship(allergy, target);
  const labels = {
    avoid: "Avoid",
    caution: "Caution to use",
    suggest: "Ok to use",
  };
  const descriptions = {
    avoid: relationship.reason,
    caution: relationship.reason,
    suggest: "Cross-reaction least likely, dissimilar R1 or R2 side chain.",
  };

  return `
    <section class="target-report ${relationship.status}">
      <strong>${labels[relationship.status]}</strong>
      <span>${target.name}: ${descriptions[relationship.status]}</span>
    </section>
  `;
}

function renderRiskColumn(status, title, groups) {
  return `
    <section class="risk-column ${status}">
      <header>
        <strong>${title}</strong>
      </header>
      ${
        groups.length
          ? groups.map(renderClassGroup).join("")
          : `<p class="empty-list">No ${title.toLowerCase()} drugs mapped for this allergy in the current data table.</p>`
      }
    </section>
  `;
}

function renderClassGroup(group) {
  return `
    <div class="class-group">
      <h3>${group.className}</h3>
      <ul class="drug-list">
        ${group.items.map(({ drug }) => `<li>${drug.name}</li>`).join("")}
      </ul>
    </div>
  `;
}

function hydrateOptions() {
  const options = document.querySelector("#drugOptions");
  options.innerHTML = drugs.map((drug) => `<option value="${drug.name}"></option>`).join("");
}

document.querySelector("#allergyInput").value = "Amoxicillin";
document.querySelector("#allergyInput").addEventListener("input", renderResult);
document.querySelector("#targetInput").addEventListener("input", renderResult);

hydrateOptions();
renderResult();
