# migre [maɪˌgre] ✈️
An [oclif](https://oclif.io)-based CLI tool to generically migrate structure of [appwrite](https://appwrite.io/) instances.

At its heart, it tries to automate the process of wiping and migrating appwrite documents and files.

Thanks to the usage of provided environmental variable and structure template files, it works for both local and remote appwrite instances.

<!-- toc -->
* [Preface](#preface)
* [Installation](#installation)
* [Usage](#usage)
<!-- tocstop -->

## Preface

I built this tool because my use case requires much wiping of documents and files, as well as migration of collections. Apart from that, I wanted to separate it as an external dependency so it can be integrated into the corresponding [package.json scripts](https://docs.npmjs.com/cli/v6/using-npm/scripts) and does not bloat my current project's directory.

For general purpose usage, it is recommended to use the official [appwrite CLI](https://appwrite.io/docs/server/database?sdk=cli).

## Installation
<!-- installation -->
```
§ npm install -g https://github.com/RayNCooper/migre 
```

## Usage
<!-- usage -->
```sh-session
USAGE
  $ migre OPERATION

ARGUMENTS
  OPERATION  (wipe|migrate) 
             [wipe] wipes all documents of the given structure type
             [migrate] migrates appwrite collection structure to structure given in structure.json

OPTIONS
  -h, --help                  show CLI help
  -r, --remote                uses vars from provided .env.appwrite.remote file
  -t, --type=documents|files  structure type to manipulate
  -v, --version               show CLI version
```