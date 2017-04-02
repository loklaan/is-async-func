module.exports = function isAsyncFunc (func) {
  const body = func.toString().trim();
  //console.log(body)
  return !!(
    // ES2017 runtimes
    body.match(/^async/) ||
    // babel, async fat arrow
    body.match(/return _ref[0-9]*\.apply/) ||
    // babel, async prop function
    body.match(/{\s+return _asyncToGenerator/g) ||
    body.match(/{\s+?var _this[0-9]*\s?=\s?this;\s*return _asyncToGenerator/g) ||
    // babel, nameless anon async function
    body.match(/{\s+?var gen\s?=\s?fn.apply\(/g)
  );
}