const path = require('path');
const FtpDeploy = require('ftp-deploy');
const yaml = require('js-yaml');
const fs = require('fs');

const ftpDeploy = new FtpDeploy();

const args = process.argv; // args = [node, file, [arg1, arg2]]

if (args[2] !== 'client' && args[2] !== 'api') {
  console.log(`The deploy task require the target argument: client or api. Current equal:${args[2]}`);
  console.log('like: npm run deploy api');

  return false;
}

let config;
try {
  config = yaml.safeLoad(fs.readFileSync('ftp-config.yml', 'utf8'));
  // const indentedJson = JSON.stringify(config, null, 4);
  // console.log(indentedJson);
} catch (e) {
  console.log(e);
}

const configClient = {
  user: config.user,
  password: config.password,
  host: config.host,
  port: config.port,
  localRoot: path.join(__dirname, config.client.localRoot),
  remoteRoot: config.client.remoteRoot,
  include: config.client.include,
  exclude: config.client.exclude,
  deleteRoot: config.client.deleteRoot,
};

const configAPi = {
  user: config.user,
  password: config.password,
  host: config.host,
  port: config.port,
  localRoot: path.join(__dirname, config.api.localRoot),
  remoteRoot: config.api.remoteRoot,
  include: config.api.include,
  exclude: config.api.exclude,
  deleteRoot: config.api.deleteRoot,
};

const targetConfig = args[2] === 'client' ? configClient : configAPi;

// use with promises
ftpDeploy
  .deploy(targetConfig)
  .then(res => console.log('finished', res))
  .catch(err => console.log(err));

ftpDeploy.on('uploading', (data) => {
  console.log(data.totalFileCount); // total file count being transferred
  console.log(data.transferredFileCount); // number of files transferred
  console.log(data.filename); // partial path with filename being uploaded
});

ftpDeploy.on('uploaded', (data) => {
  console.log(data); // same data as uploading event
});
