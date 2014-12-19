var fileFilter = require('./fileFilter');

var dir = process.argv[2];
var ext = process.argv[3];

fileFilter(dir, ext, function (err, data) {
  if(err) {
    return console.log('You received the following error: ' + err);
  }
  data.forEach(function (file) {
    console.log(file);
  });
});
