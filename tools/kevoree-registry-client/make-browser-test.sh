#! /bin/sh
browserify ./browser-test/main.js -o browser/kevoree-registry-client.js && http-server browser
