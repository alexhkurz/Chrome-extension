const intermoduleDataDir = '../intermodule-data';
const fs = require('fs');
const path = require('path');
const bibtexParse = require('bibtex-parse-js'); // provides .toJSON method and .toBibtex method

function convertBibToJson() {
  const bibPath = path.join(__dirname, `${intermoduleDataDir}/history.bib`);
  const jsonPath = path.join(__dirname, `${intermoduleDataDir}/metadata.json`);

  const bibContent = fs.readFileSync(bibPath, 'utf-8');
  console.log("BibTeX content: ", bibContent);
  const parsed = bibtexParse.toJSON(bibContent);

  console.log("Parsed BibTeX data: ", parsed);
  const jsonContent = JSON.stringify(parsed, null, 2);
  fs.writeFileSync(jsonPath, jsonContent);
}
module.exports = {convertBibToJson};
convertBibToJson();

