"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.formatAttributes = formatAttributes;
exports.toHTML = toHTML;

var _compat = require("./compat");

function formatAttributes(attributes) {
  return attributes.reduce((attrs, attribute) => {
    const {
      key,
      value
    } = attribute;

    if (value === null) {
      return `${attrs} ${key}`;
    }

    const quoteEscape = value.indexOf('"') !== -1;
    const quote = quoteEscape ? '\'' : '"';
    return `${attrs} ${key}=${quote}${value}${quote}`;
  }, '');
}

function toHTML(tree, options) {
  return tree.map(node => {
    if (node.type === 'text') {
      return node.content;
    }

    if (node.type === 'comment') {
      return `<!--${node.content}-->`;
    }

    const {
      tagName,
      attributes,
      children
    } = node;
    const isSelfClosing = (0, _compat.arrayIncludes)(options.voidTags, tagName.toLowerCase());
    return isSelfClosing ? `<${tagName}${formatAttributes(attributes)}>` : children.length ? `<${tagName}${formatAttributes(attributes)}>${toHTML(children, options)}</${tagName}>` : `<${tagName}${formatAttributes(attributes)} />`;
  }).join('');
}

var _default = {
  toHTML
};
exports.default = _default;