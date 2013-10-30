grunt-runner
============

<q><i>A more capable grunt runner, coincidentally also called grunt.</i></q>
~ inspired by [paulp/sbt-extras](https://github.com/paulp/sbt-extras)

This script is intended to be used as a Grunt cli, extending Grunt's standard cli.
What it does, is to:

1. Download nvm (Node Version Manager) from GitHub
2. Use nvm to install the node/npm version specified in package.json
3. Run npm install (with the local node/npm)
4. Run grunt, with local node/npm/grunt executables.

## Why?
- You don't have to install Node/NPM on your system.
- If you have multiple projects with different versions of Node,
you don't have to think about switching versions all the time.

## Usage
You can choose to add this directory to your PATH, or you can commit it directly into your project.
Run it from the command line - "grunt" - just like you're used to.
Currently it only works on Windows. If you want to help port it to Unix, feel free!

### Contributing
Open an issue in the issue tracker and send pull requests.

### License
Apache 2.0
