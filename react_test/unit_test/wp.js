const childProcess = require('child_process');
const { exec }     = require('child_process');
const { execSync } = require('child_process');

execSync('webpack --mode development');