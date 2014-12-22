//Modules
var crypto = require('crypto');
var tar = require('tar');
var zlib = require('zlib');
var through = require('through');

// File decryption
var cipher = process.argv[2];
var passphrase = process.argv[3];
var decrypter = crypto.createDecipher(cipher, passphrase);

// File unzipping
var unzip = zlib.createGunzip();

// Tarball parsing
var parser = tar.Parse();
parser.on('entry', function(e) {
  if (e.type !== 'File') { return; }

  var hasher = crypto.createHash('md5', { encoding: 'hex' });
  e.pipe(hasher).pipe(through(null, end)).pipe(process.stdout);

  function end() {
    this.queue(' ' + e.path + '\n');
  }
});

process.stdin
  .pipe(decrypter)
  .pipe(unzip)
  .pipe(parser);
