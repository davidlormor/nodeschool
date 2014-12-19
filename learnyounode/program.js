var http = require('http');
var concat = require('concat-stream');
var async = require('async');
var urls = [process.argv[2], process.argv[3], process.argv[4]];

function getData (url, callback) {
  http.get(url, function (res) {
    res.on('error', console.error);
    res.pipe(concat(function (data) {
      console.log(data.toString());
      callback();
    }));
  });
}

async.eachSeries(urls, getData, function (err) {
  console.error(err);
});
