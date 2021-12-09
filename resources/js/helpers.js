function ensureArray (object) {
  return Array.isArray(object) ? object : []
}

function asyncDelay(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

function delay(ms) {
  setTimeout(()=>{}, ms);
}

function isString(x) {
  return Object.prototype.toString.call(x) === "[object String]"
}

const getChildrenTextContent = function (children) {
  return children.map(function (node) {
    return isString(node.children)
      ? node.children
      : getChildrenTextContent(node.children)
  }).join('')
};

export default {
  ensureArray,
  asyncDelay,
  delay,
  isString,
  getChildrenTextContent
}