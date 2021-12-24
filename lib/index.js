"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;
exports.parseDefaults = void 0;
exports.stringify = stringify;

var _lexer = _interopRequireDefault(require("./lexer"));

var _parser = _interopRequireDefault(require("./parser"));

var _format = require("./format");

var _stringify = require("./stringify");

var _tags = require("./tags");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const parseDefaults = {
  voidTags: _tags.voidTags,
  closingTags: _tags.closingTags,
  childlessTags: _tags.childlessTags,
  closingTagAncestorBreakers: _tags.closingTagAncestorBreakers,
  includePositions: false
};
exports.parseDefaults = parseDefaults;

function parse(str, options = parseDefaults) {
  const tokens = (0, _lexer.default)(str, options);
  const nodes = (0, _parser.default)(tokens, options);
  return (0, _format.format)(nodes, options);
}

function stringify(ast, options = parseDefaults) {
  return (0, _stringify.toHTML)(ast, options);
}