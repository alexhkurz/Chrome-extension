const fs = require('fs');
const path = require('path');

// Define the path of the input and output files
const historyPath = path.join(__dirname, '../server/history.txt');
const outputPath = path.join(__dirname, 'history_pdf.txt');

// Read the history file
const history = fs.readFileSync(historyPath, 'utf-8');

// Use a regular expression to match URLs
const urlRegex = /(http|https):\/\/[^\s$.?#].[^\s]*\.pdf/g;

// Extract the URLs
const urls = history.match(urlRegex);

// Write the URLs to the output file
fs.writeFileSync(outputPath, urls.join('\n'));