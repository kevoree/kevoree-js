/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';

const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const resolveOwn = (relativePath) => path.resolve(__dirname, '..', relativePath);

module.exports = {
  appPath: resolveApp('.'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTest: resolveApp('test'),
  appModel: resolveApp('kevlib.json'),
  appBabelrc: resolveApp('.babelrc'),
  appWebpackConf: resolveApp('webpack.config.js'),
  appBrowserEntry: resolveApp('lib/browser.js'),
  appBrowser: resolveApp('browser'),
  appKevs: resolveApp('kevs/main.kevs'),
  appNodeModules: resolveApp('node_modules'),
  ownPath: resolveOwn('.'),
  ownNodeModules: resolveOwn('node_modules'), // This is empty on npm 3
};
