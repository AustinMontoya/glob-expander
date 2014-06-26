var fs = require('fs');
var path = require('path');

function processPath(basePath, rest, result) {
  result.push(path.join(basePath, rest));
  fs.readdirSync(basePath).forEach(function (entry) {
    var relativePath = path.join(basePath, entry);
    if (fs.statSync(relativePath).isDirectory()) {
      processPath(relativePath, rest, result);
    }
  });
};

module.exports = function (patterns) {
  var expansions = [];

  if (typeof patterns === 'string') patterns = [patterns];

  patterns.forEach(function (pattern) {
    var globStart = pattern.indexOf('**');

    // Pass through anything that isn't a globbed pattern
    if (globStart === -1) {
      expansions.push(pattern);
      return;
    }

    var basePath = pattern.substr(0, globStart);
    var rest = pattern.substr(globStart + 2, globStart.length);
    if (!rest) rest = '*';
    processPath(basePath, rest, expansions);

  });
  
  return expansions;
}
