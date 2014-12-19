var http = require('http');
var concat = require('concat-stream');

var url = process.argv[2];

http.get(url, function (res) {
  res.on('error', console.error);
  res.pipe(concat(function (data) {
    var string = data.toString();
    console.log(string.length);
    console.log(string);
  }));
});
