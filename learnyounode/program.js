var http = require('http');
var map = require('through2-map');

var port = process.argv[2];

var server = http.createServer(function (req, res) {
  if (req.method != 'POST') {
    return res.end('POSTs only!');
  }
  req.pipe(map(function (stream) {
    return stream.toString().toUpperCase();
  })).pipe(res);
});

server.listen(port);
