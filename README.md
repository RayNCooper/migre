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

The release of the 1.0 version as well as an npm package will happen after commits for [applying collection IDs to .env files](https://github.com/RayNCooper/migre/issues/1) as well as allowing to wipe documents have been merged into the main tree.

For general purpose usage such as programmatic creation of collections/documents/users, it is recommended to use the official [appwrite CLI](https://appwrite.io/docs/server/database?sdk=cli).

## Installation
<!-- installation -->
```
§ npm install -g https://github.com/RayNCooper/migre 
```

## Usage
<!-- usage -->
For migre to work, you have to do a bit of configuration once.

### structure.json
First, create a structure.json that has the same form as the request inside the [appwrite backend SDK's createCollection function](https://appwrite.io/docs/server/database?sdk=nodejs#databaseCreateCollection). You can find an example in the `structure.example.json` inside this repository. **NOTE**: collection relations are not ready yet, [contributions are welcome!](https://github.com/RayNCooper/migre/issues/2)


### .env.appwrite
Secondly, duplicate the `.env.appwrite.example` two times and name the resulting files `.env.appwrite` and `.env.appwrite.remote`. Configure the parameters according to your corresponding appwrite instance's values. The default is `.env.appwrite`, which should be configured with regard to the locally running appwrite instance. In turn, `.env.appwrite.remote` is meant to be configured with regard to a remotely running (production) instance of appwrite.


### CLI
After following the preceding instructions, you are now ready to use the CLI:
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