var fs = require('fs');

var path = process.argv[2];

var file = fs.readFileSync(path);
console.log(file.toString().split('\n').length - 1);
