var verpatch = require('../lib/index');

const bluebird = require('bluebird'), 
  fs = bluebird.promisifyAll(require('fs')),
  path = require('path'),
  expect = require('chai').expect
  ;

bluebird.onPossiblyUnhandledRejection(function(){});

describe('verpatch', function(){
  this.timeout(5000);
  it('throws an error when not passed an executable path', () => {
    return expect(verpatch()).to.be.rejected;
  });

  it('throws an error when not passed version', () => {
    return expect(verpatch('./path/to/exe')).to.be.rejected;
  });

  it('throws an error when not passed options', () => {
    return expect(verpatch('./path/to/exe', '0.0.0')).to.be.rejected;
  });

  it('should be able to modify version information of an exe', () => {
    const executablePath = path.resolve(__dirname, '../bin/verpatch_copy.exe');

    return new bluebird((resolve, reject) => {
      fs.createReadStream(path.resolve(__dirname,'../bin/verpatch.exe'))
        .pipe(fs.createWriteStream(executablePath))
        .on('error', reject)
        .on('finish', resolve);
    })
    .then(() => {
      return verpatch(
          executablePath
        , '1.0.0'
        , {
            desc:    'description'
          , pb:      'built by' //Private Build
          , pv:      '1.0.0' //Product Version
          , company: 'company name'
          , product: 'product name'
          , '(c)':   'copyright'
        });
    })
    .then(() => {
      //Cleanup copy
      return fs.unlinkAsync(executablePath);
    });
  });
});