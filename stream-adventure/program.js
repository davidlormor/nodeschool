var combine = require('stream-combiner');
var through = require('through');
var split = require('split');
var zlib = require('zlib');

module.exports = function() {
  var group = through(write, end);
  var genre;

  function write (object) {
    if(object.length === 0) { return; }
    var row = JSON.parse(object);
    if(row.type === 'genre') {
      if(genre) {
        this.queue(JSON.stringify(genre) + '\n');
      }
      genre = { name: row.name, books: [] };
    } else if (row.type === 'book') {
      genre.books.push(row.name);
    }
  }

  function end() {
    if(genre) {
      this.queue(JSON.stringify(genre) + '\n');
    }
    this.queue(null);
  }

  return combine(split(), group, zlib.createGzip());
};
