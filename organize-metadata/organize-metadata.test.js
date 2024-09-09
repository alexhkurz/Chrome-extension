const fs = require('fs');
const path = require('path');
const { convertBibToJson } = require('./organize-metadata');

test('convertBibToJson function is defined', () => {
  expect(typeof convertBibToJson).toEqual('function');
});

test('convertBibToJson creates metadata.json file', () => {
  convertBibToJson();
  const jsonPath = path.join(__dirname, '../intermodule-data/metadata.json');
  expect(fs.existsSync(jsonPath)).toBe(true);
});
