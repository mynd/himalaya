"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayIncludes = arrayIncludes;
exports.endsWith = endsWith;
exports.isRealNaN = isRealNaN;
exports.startsWith = startsWith;
exports.stringIncludes = stringIncludes;

/*
  We don't want to include babel-polyfill in our project.
    - Library authors should be using babel-runtime for non-global polyfilling
    - Adding babel-polyfill/-runtime increases bundle size significantly

  We will include our polyfill instance methods as regular functions.
*/
function startsWith(str, searchString, position) {
  return str.substr(position || 0, searchString.length) === searchString;
}

function endsWith(str, searchString, position) {
  const index = (position || str.length) - searchString.length;
  const lastIndex = str.lastIndexOf(searchString, index);
  return lastIndex !== -1 && lastIndex === index;
}

function stringIncludes(str, searchString, position) {
  return str.indexOf(searchString, position || 0) !== -1;
}

function isRealNaN(x) {
  return typeof x === 'number' && isNaN(x);
}

function arrayIncludes(array, searchElement, position) {
  const len = array.length;
  if (len === 0) return false;
  const lookupIndex = position | 0;
  const isNaNElement = isRealNaN(searchElement);
  let searchIndex = lookupIndex >= 0 ? lookupIndex : len + lookupIndex;

  while (searchIndex < len) {
    const element = array[searchIndex++];
    if (element === searchElement) return true;
    if (isNaNElement && isRealNaN(element)) return true;
  }

  return false;
}