var through = require('through');
var tr = through(write);

function write(data) {
  this.queue(data.toString().toUpperCase());
}

process.stdin.pipe(tr).pipe(process.stdout);
