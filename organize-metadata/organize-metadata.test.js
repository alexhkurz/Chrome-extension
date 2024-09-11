const fs = jest.createMockFromModule('fs');
const path = require('path');
const { convertBibToJson } = require('./organize-metadata.js');

test('convertBibToJson function is defined', () => {
  console.log('Running test: convertBibToJson function is defined');
  expect(typeof convertBibToJson).toEqual('function');
});

test('convertBibToJson creates metadata.json file', () => {
  console.log('Running test: convertBibToJson creates metadata.json file');
  fs.writeFileSync = jest.fn();
  fs.readFileSync = jest.fn()
    .mockReturnValueOnce('@article{dummy,\n  title={dummy title}\n}')
    .mockReturnValueOnce('[]');
  convertBibToJson();
  expect(fs.writeFileSync).toHaveBeenCalled();
});
