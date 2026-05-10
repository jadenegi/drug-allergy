# Beta-Lactam Allergy Cross-Reactivity App

This is a first working prototype for checking beta-lactam antibiotic cross-reactivity using the Northwestern Medicine beta-lactam cross-reactivity chart as the reference model.

Open `index.html` in a browser to use it.

## What it does

- Search a reported antibiotic allergy.
- Show all mapped `AVOID` and `CAUTION` drugs for that reported allergy.
- Group the results by antibiotic class.
- Optionally enter a targeted drug and get a short report: `Avoid`, `Caution to use`, or `Ok to use`.

## Where to edit data

- Edit the drug list at the top of `app.js`.
- Edit explicit CAUTION pairings in `cautionPairs` in `app.js`.
- Edit AVOID behavior in `getRelationship` in `app.js`.

## Important clinical limitation

This is a prototype decision-support tool, not a validated clinical product. Before clinical use, the rule table should be checked against the full Northwestern matrix and reviewed by a pharmacist, allergist, or antimicrobial stewardship team.

## Reference

The app follows the chart concepts:

- `AVOID`: known cross reaction or identical R1/R2 side chain.
- `CAUTION`: cross reaction less likely or selective, similar R1 ring or branch.
- `SUGGEST`: cross reaction least likely, dissimilar R1/R2 side chain.
- Cefazolin is treated as a unique-side-chain exception.
