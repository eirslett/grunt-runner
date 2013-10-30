grunt-runner
============

A more capable grunt runner, coincidentally also called grunt.

This script is intended to be used as a Grunt cli, extending Grunt's standard cli.
What it does, is to:
1) Download nvm (Node Version Manager) from GitHub
2) Use nvm to install the version specified in package.json
3) Run npm install (with the local node/npm)
4) Run the actual grunt, with local node/npm/grunt executables.
