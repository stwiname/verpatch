const bluebird = require('bluebird');
const spawn = require('child_process').spawn;
const path = require('path');

function verpatch(exePath, version, options) {

  return new bluebird((resolve, reject) => {

    if (process.platform !== 'win32'){
      reject(new Error('Verpatch only works on windows'));
      return;
    }

    if (!exePath){
      reject(new Error('Executable path not provided'));
      return;
    }

    if (!version){
      reject(new Error('Version not provided'));
      return;
    }

    if (!options){
      reject(new Error('Options not provided'));
      return;
    }

    args = ['/va', path.resolve(exePath), version];

    for (var option in options){
      if (option === 'pv'){
        args.push('/pv', options[option])
      }
      else {
        args.push('/s', option, options[option]);
      }
    }

    spawn(path.resolve(__dirname, '../bin/verpatch.exe'), args)
      .on('error', error => {
        console.log(error);
        reject(error);
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