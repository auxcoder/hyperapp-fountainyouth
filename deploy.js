const path = require('path');
const FtpDeploy = require('ftp-deploy'); // eslint-disable-line
const yaml = require('js-yaml'); // eslint-disable-line
const fs = require('fs');

const ftpDeploy = new FtpDeploy();

let config;
try {
  config = yaml.safeLoad(fs.readFileSync('ftp-config.yml', 'utf8'));
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

// use with promises
ftpDeploy
  .deploy(configClient)
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
