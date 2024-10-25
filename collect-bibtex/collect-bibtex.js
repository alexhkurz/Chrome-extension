const intermoduleDataDir = '../intermodule-data';
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const unidecode = require('unidecode');

// Function to process a BibTeX entry and replace non-ASCII characters in the key with similar ASCII characters
function processBibtexEntry(entry) {
  const lines = entry.split('\n');
  const processedLines = lines.map(line => {
    if (line.startsWith('@')) {
      const [start, key] = line.split('{');
      const processedKey = unidecode(key);
      return `${start}{${processedKey}`;
    } else {
      return line;
    }
  });
  return processedLines.join('\n');
}

// Define the path of the input and output files
const historyPath = path.join(__dirname, `${intermoduleDataDir}/history.json`);
console.log('History file path:', historyPath);
const outputPath = path.join(__dirname, `${intermoduleDataDir}/history.bib`);

// Read and parse the history file
const history = JSON.parse(fs.readFileSync(historyPath, 'utf-8'));

// Use a regular expression to match URLs
const urlRegex = /(http|https):\/\/[^\s$.?#].[^\s]*\.pdf(?=")/g;

// Extract the URLs from each event in the history
const urls = history.flatMap(event => event.url ? [event.url] : []);

// Check if urls is null
if (urls === null) {
    // Write an empty string to the output file
    fs.writeFileSync(outputPath, '');
} else {
    // Filter the URLs to only include those that start with "http"
    const filteredUrls = urls.filter(url => url.startsWith('http'));

    // Fetch the BibTeX for each URL and write it to the output file
    Promise.all(filteredUrls.map(url => {
      const bibtexUrl = url.replace('/pdf/', '/bibtex/');
      return axios.get(bibtexUrl)
        .then(response => processBibtexEntry(response.data))
        .catch(error => {
          console.error(`Failed to fetch BibTeX from ${bibtexUrl}:`, error.message);
          return '';
        });
    })).then(bibtexEntries => {
      const validBibtexEntries = bibtexEntries.filter(entry => entry.startsWith('@'));
      const uniqueBibtexEntries = Array.from(new Set(validBibtexEntries));
      fs.writeFileSync(outputPath, uniqueBibtexEntries.join('\n\n'));
    }).catch(error => {
      console.error(error);
    });
}

// Implement a file watcher to detect changes
fs.watch(historyPath, (eventType, filename) => {
  if (eventType === 'change') {
    console.log(`File ${filename} has been changed`);
    // Re-read the file here
  }
});
