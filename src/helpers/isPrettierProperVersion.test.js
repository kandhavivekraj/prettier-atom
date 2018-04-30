// @flow
jest.mock('../atomInterface');
jest.mock('./getPrettierInstance');

const buildMockEditor = require('../../tests/mocks/textEditor');
const { addErrorNotification } = require('../atomInterface');
const getPrettierInstance = require('./getPrettierInstance');
const isPrettierProperVersion = require('./isPrettierProperVersion');

const editor = buildMockEditor();

beforeEach(() => {
  getPrettierInstance.mockImplementation(() => ({ getFileInfo: { sync: jest.fn() } }));
});

it('returns true if prettier has getFileInfo.sync defined', () => {
  const actual = isPrettierProperVersion(editor);

  expect(actual).toEqual(true);
});

it('displays an error if prettier does not have getFileInfo.sync defined', () => {
  getPrettierInstance.mockImplementation(() => ({}));

  isPrettierProperVersion(editor);

  expect(addErrorNotification).toHaveBeenCalled();
});
