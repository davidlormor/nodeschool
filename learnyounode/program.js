var net = require('net');
var moment = require('moment');
var port = process.argv[2];

var server = net.createServer(function (client) {
  client.end(moment().format('YYYY-MM-DD HH:mm'));
});

server.listen(port);
