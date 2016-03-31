const bluebird = require('bluebird');
const spawn = require('child_process').spawn;
const path = require('path');

function verpatch(exePath, options) {

  return new bluebird((resolve, reject) => {
    if (!exePath){
      reject(new Error('Executable path not provided'));
      return;
    }

    if (!options){
      reject(new Error('Options not provided'));
      return;
    }

    args = ['/va', path.resolve(exePath)];

    for (var option in options){
      if (option === 'version'){
        args.push(options[option]);
      }
      else if (option === 'pv'){
        args.push('/pv', options[option])
      }
      else {
        args.push('/s', option, options[option]);
      }
    }

    console.log('args', args);

    spawn(path.resolve(__dirname, '../bin/verpatch.exe'), args)
      .on('error', (error) => {
        reject(error);
      })
      .on('data', (data) => {
        console.log('data', data);
      })
      .on('exit', (code, signal) => {
        if (code !== 0){
          reject(`Process exited with non zero exit code: ${code}`);
        }
        resolve();
      })
  });
}

module.exports = verpatch;