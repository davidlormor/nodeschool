var http = require('http');
var url = require('url');
var moment = require('moment');

var port = process.argv[2];

// Return JSON with hour, minute, and second
function parseTime(time) {
  return {
    'hour': time.hour(),
    'minute': time.minute(),
    'second': time.second()
  };
}

//Return JSON with unixtime (including milliseconds)
function unixTime(time) {
  return {'unixtime': time.valueOf()};
}

// Respond with error
function errorResponse(res, method, message) {
  res.writeHead(method);
  res.end(message);
}

var server = http.createServer(function (req, res) {
  // Parse URL
  var parsedUrl = url.parse(req.url, true);
  var pathname = parsedUrl.pathname;
  var time = moment(parsedUrl.query.iso);
  var result;

  // Only respond to GET requests
  if (req.method === 'GET') {
    if (pathname === '/api/parsetime') {
      result = parseTime(time);
    }
    if (pathname === '/api/unixtime') {
      result = (unixTime(time));
    }
    if (result) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    } else {
      errorResponse(res, 404, 'Path not valid');
    }
  } else {
    errorResponse(res, 404, 'Please send a GET request');
  }
});

server.listen(port);
