var args = process.argv.slice(2);
var total = 0;
args.forEach(function (arg) {
  total += (+arg);
});

console.log(total);
