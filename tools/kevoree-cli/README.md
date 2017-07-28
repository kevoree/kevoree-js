## Kevoree Javascript command-line client
[![NPM](https://nodei.co/npm/kevoree-cli.png)](https://nodei.co/npm/kevoree-cli/)

### Install
Prefer a global install for this module as it is intended to be used as a client tool:
```sh
npm i -g kevoree-cli
```

### Usage
Usage documentation is available by using the `-h` flag (or nothing):
```sh
kevoree -h
```
Outputs:
```
$ kevoree

  Usage: kevoree [options] [command]


  Commands:

    clean       Delete installed modules out of the cache folder
    init        Initialize Kevoree's config file
    login       Save your Kevoree registry credentials
    start       Start a Kevoree Javascript runtime
    config      Prints the current Kevoree config file
    help [cmd]  display help for [cmd]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

> To get more details about a command: `$ kevoree help <command>`

### Start a runtime
Now we can start a new **Kevoree** JavaScript runtime from the command-line by using:
```sh
kevoree start
```

> This command will start a runtime based on a default model if none given (with `-m /path/to/model.{json,kevs}`)  
> ```
> // default model
> add node0: JavascriptNode
> add sync: WSGroup
>
> attach node0 sync
>
> set sync.port/node0 = '9000'
> ```
> This behavior will result in a port conflict if you try to run several *"default"* runtime on the same machine.
