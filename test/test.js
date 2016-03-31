var verpatch = require('../lib/index');
const expect = require('chai').expect;
const fs = require('fs'),
  path = require('path'),
  bluebird = require('bluebird');


describe('verpatch', function(){
  this.timeout(5000);
  it('throws an error when not passed an executable path', () => {
     return verpatch()
      .catch(error => {
        expect(error).not.to.be.null;
      });
  });

  it('throws an error when not passed options', () => {
    return verpatch('./path/to/exe')
      .catch(error => {
        expect(error).not.to.be.null;
      });
  });

  it('should be able to modify version information of an exe', () => {


    return new bluebird((resolve, reject) => {
      fs.createReadStream(path.resolve(__dirname,'../bin/verpatch.exe'))
        .pipe(fs.createWriteStream(path.resolve(__dirname, '../bin/verpatch_copy.exe')))
        .on('error', reject)
        .on('finish', resolve);
    })
    .then(() => {
      return verpatch(
        path.resolve(__dirname, '../bin/verpatch_copy.exe')
        , {
            version: '1.0.0'
          , desc:    'description'
          , pb:      'built by' //Private Build
          , pv:      '1.0.0' //Product Version
          , company: 'company name'
          , product: 'product name'
          , '(c)':   'copyright'
        });
    });

  });
});