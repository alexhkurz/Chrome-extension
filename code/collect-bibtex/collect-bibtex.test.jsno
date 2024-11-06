const fs = jest.createMockFromModule('fs');
fs.readFileSync = jest.fn().mockReturnValue('{"dummy": "dummy"}');
const { processBibtexEntry } = require('./collect-bibtex.js');

test('processBibtexEntry function is defined', () => {
  console.log('Running test: processBibtexEntry function is defined');
  expect(typeof processBibtexEntry).toEqual('function');
});

test('processBibtexEntry processes a bibtex entry', () => {
  console.log('Running test: processBibtexEntry processes a bibtex entry');
  const dummyEntry = '@article{dummy, title={dummy title}}';
  const processedEntry = processBibtexEntry(dummyEntry);
  expect(processedEntry).toContain('@article{dummy');
});
