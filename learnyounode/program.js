var fs = require('fs');
var path = require('path');

var filePath = process.argv[2];
var filter = process.argv[3];

fs.readdir(filePath, function (err, list) {
  var filtered = list.filter(function (file) {
    return path.extname(file).slice(1) === filter;
  });
  filtered.forEach(function (file) {
    console.log(file);
  });
});
