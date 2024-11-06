# p-ai-a (personal AI assistant)

WARNING: Proof of concept only, not meant to actually do anything useful at this stage.

Idea: Log internet usage locally to allow for data analysis and "attention mining".

Current Data Flow: `history.json` -> `history.bib` -> `metadata.json`

## Installation of the extension

1. Open Chrome and navigate to chrome://extensions.
2. Enable Developer mode by ticking the checkbox in the upper-right corner.
3. Click on the "Load unpacked extension..." button.
4. Select your extension's directory `my_extension`

You should now see your extension in the list, and a new icon in your menu bar. You can view the console by clicking on the link "Inspect views" under your extension in chrome://extensions.

## Running the server

copy the ID of your extension in the first line of `server/server.js`

```
cd server
npm install
npm start
```

The server logs the activity of the browser in `intermodule-data/history.json`.

## Collecting Bibtex Entries

If you have urls linking to pdf files on Arxiv, then you can save them in a file `intermodule-data/history.bib` as follows.

```
cd collect-bibtex
npm install
node collect-bibtex.js
```

## Organizing Metadata

Collect metadata and store it in a file `intermodule-data/metadata.json`.

