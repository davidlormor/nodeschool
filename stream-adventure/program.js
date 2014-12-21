var http = require('http');
var through = require('through');
var port = parseInt(process.argv[2]);

var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    req.pipe(through(function (buf) {
      this.queue(buf.toString().toUpperCase());
    })).pipe(res);
  } else {
    res.end('Send a POST\n');
  }
});

server.listen(port);
