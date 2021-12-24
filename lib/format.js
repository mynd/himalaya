"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.format = format;
exports.formatAttributes = formatAttributes;
exports.splitHead = splitHead;
exports.unquote = unquote;

function splitHead(str, sep) {
  const idx = str.indexOf(sep);
  if (idx === -1) return [str];
  return [str.slice(0, idx), str.slice(idx + sep.length)];
}

function unquote(str) {
  const car = str.charAt(0);
  const end = str.length - 1;
  const isQuoteStart = car === '"' || car === "'";

  if (isQuoteStart && car === str.charAt(end)) {
    return str.slice(1, end);
  }

  return str;
}

function format(nodes, options) {
  return nodes.map(node => {
    const type = node.type;
    const outputNode = type === 'element' ? {
      type,
      tagName: node.tagName.toLowerCase(),
      attributes: formatAttributes(node.attributes),
      children: format(node.children, options)
    } : {
      type,
      content: node.content
    };

    if (options.includePositions) {
      outputNode.position = node.position;
    }

    return outputNode;
  });
}

function formatAttributes(attributes) {
  return attributes.map(attribute => {
    const parts = splitHead(attribute.trim(), '=');
    const key = parts[0];
    const value = typeof parts[1] === 'string' ? unquote(parts[1]) : null;
    return {
      key,
      value
    };
  });
}