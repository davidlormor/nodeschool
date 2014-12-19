var fs = require('fs');
var path = require('path');

module.exports = function (dir, ext, callback) {
  fs.readdir(dir, function (err, list) {
    if(err) {
      return callback(err);
    } else {
      var filtered = list.filter(function (file) {
        return path.extname(file).slice(1) === ext;
      });
      callback(null, filtered);
    }
  });
};
