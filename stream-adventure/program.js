var through = require('through');
var split = require('split');
var tr = through(write);
var line = 0;

function write(data) {
  line++;
  var string = data.toString();
  this.queue(line % 2 === 0 ?
    string.toUpperCase() + '\n' :
    string.toLowerCase() + '\n'
  );
}

process.stdin
  .pipe(split())
  .pipe(tr)
  .pipe(process.stdout);
