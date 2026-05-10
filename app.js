const drugs = [
  { name: "Penicillin", className: "Penicillin", group: "natural-penicillin", family: "penicillin" },
  { name: "Nafcillin/Oxacillin/Dicloxacillin", className: "Penicillin", group: "anti-staph-penicillin", family: "penicillin" },
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
  ["naf", "Nafcillin/Oxacillin/Dicloxacillin"],
  ["nafcillin", "Nafcillin/Oxacillin/Dicloxacillin"],
  ["oxacillin", "Nafcillin/Oxacillin/Dicloxacillin"],
  ["dicloxacillin", "Nafcillin/Oxacillin/Dicloxacillin"],
  ["erta", "Ertapenem"],
  ["ertapenem", "Ertapenem"],
  ["imipenem", "Imipenem"],
  ["mero", "Meropenem"],
  ["meropenem", "Meropenem"],
]);

const avoidPairs = new Map([
  ["Penicillin", ["Amoxicillin", "Ampicillin"]],
  ["Amoxicillin", ["Penicillin", "Ampicillin", "Cefadroxil", "Cefprozil"]],
  ["Ampicillin", ["Penicillin", "Amoxicillin", "Cephalexin", "Cefaclor"]],
  ["Cefadroxil", ["Amoxicillin", "Cephalexin", "Cefprozil"]],
  ["Cephalexin", ["Ampicillin", "Cefadroxil", "Cefaclor"]],
  ["Cefaclor", ["Ampicillin", "Cephalexin"]],
  ["Cefoxitin", ["Cefuroxime"]],
  ["Cefprozil", ["Amoxicillin", "Cefadroxil"]],
  ["Cefuroxime", ["Cefoxitin"]],
  ["Cefdinir", ["Cefixime"]],
  ["Cefixime", ["Cefdinir"]],
  ["Cefotaxime", ["Cefpodoxime", "Ceftriaxone", "Cefepime"]],
  ["Cefpodoxime", ["Cefotaxime", "Ceftriaxone", "Cefepime"]],
  ["Ceftazidime", ["Cefiderocol", "Aztreonam"]],
  ["Ceftriaxone", ["Cefotaxime", "Cefpodoxime", "Cefepime"]],
  ["Cefepime", ["Cefotaxime", "Cefpodoxime", "Ceftriaxone"]],
  ["Cefiderocol", ["Ceftazidime", "Aztreonam"]],
  ["Aztreonam", ["Ceftazidime", "Cefiderocol"]],
]);

const cautionPairs = new Map([
  ["Penicillin", ["Nafcillin/Oxacillin/Dicloxacillin", "Piperacillin", "Cefadroxil", "Cephalexin", "Cefaclor", "Cefprozil"]],
  ["Nafcillin/Oxacillin/Dicloxacillin", ["Penicillin", "Amoxicillin", "Ampicillin", "Piperacillin"]],
  ["Amoxicillin", ["Nafcillin/Oxacillin/Dicloxacillin", "Piperacillin", "Cephalexin", "Cefaclor"]],
  ["Ampicillin", ["Nafcillin/Oxacillin/Dicloxacillin", "Piperacillin", "Cefadroxil", "Cefprozil"]],
  ["Piperacillin", ["Penicillin", "Nafcillin/Oxacillin/Dicloxacillin", "Amoxicillin", "Ampicillin"]],
  ["Cefadroxil", ["Penicillin", "Ampicillin", "Cefaclor"]],
  ["Cephalexin", ["Penicillin", "Amoxicillin", "Cefprozil"]],
  ["Cefaclor", ["Penicillin", "Amoxicillin", "Cefadroxil", "Cefprozil"]],
  ["Cefprozil", ["Penicillin", "Ampicillin", "Cephalexin", "Cefaclor"]],
  ["Cefuroxime", ["Cefotaxime", "Cefpodoxime", "Ceftazidime", "Ceftriaxone", "Cefepime"]],
  ["Cefotaxime", ["Cefuroxime", "Ceftazidime"]],
  ["Cefpodoxime", ["Cefuroxime", "Ceftazidime"]],
  ["Ceftazidime", ["Cefuroxime", "Cefotaxime", "Cefpodoxime", "Ceftriaxone", "Cefepime"]],
  ["Ceftriaxone", ["Cefuroxime", "Ceftazidime"]],
  ["Cefepime", ["Cefuroxime", "Ceftazidime"]],
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

  if (isAvoidPair(allergy.name, candidate.name)) {
    return {
      status: "avoid",
      reason: "Known cross-reaction or identical side chain",
      detail: "Mapped as AVOID in the Northwestern chart.",
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

function isAvoidPair(firstName, secondName) {
  return (
    avoidPairs.get(firstName)?.includes(secondName) ||
    avoidPairs.get(secondName)?.includes(firstName) ||
    false
  );
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

document.querySelector("#allergyInput").addEventListener("input", renderResult);
document.querySelector("#targetInput").addEventListener("input", renderResult);

hydrateOptions();
renderResult();
