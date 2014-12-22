var duplex = require('duplexer');
var through = require('through');

module.exports = function(counter) {
  var countries = {};
  var countryStream = through(write, end);

  function write(location) {
    countries[location.country] = (countries[location.country] || 0) + 1;
  }
  function end () {
    counter.setCounts(countries);
  }

  return duplex(countryStream, counter);
};
