'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const glob = require('glob');
const readFile = require('./utils/readFile');
const writeFile = require('./utils/writeFile');
const { dirname, join } = require('path');
const loadConfigFile = require('./utils/loadConfigFile');

const clean = exports.clean = () => {};

const build = exports.build = (src = './src/config') => Promise.all(glob.sync(join(src, '**/*.yml')).map(filename => readFile(filename).then(content => {
  const [serverConfig, browserConfig] = loadConfigFile(content, dirname(filename));
  const destFile = `${filename.slice(4, -3)}json`;

  return Promise.all([writeFile(`build/${destFile}`, JSON.stringify(serverConfig)), writeFile(`public/${destFile}`, JSON.stringify(browserConfig))]);
})));

const watch = exports.watch = () => {};
//# sourceMappingURL=config-build.js.map