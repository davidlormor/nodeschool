var http = require('http');

var url = process.argv[2];

http.get(url, function (res) {
  res.setEncoding('utf8');
  var data = res.on('data', function (data) {
    console.log(data);
  });
});
