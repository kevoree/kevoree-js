# Kevoree-JS

## Project description
__kevoree-js__ provides several tools in order to use [Kevoree](http://kevoree.org) in the Javascript world.

> If you already have the KevoreeJS environment up and ready, you already can [build up your first component!](https://github.com/dukeboard/kevoree-js/blob/master/library/README.md)


## Getting started
There is 2 things you will need to get started:

 * __kevoree-web-editor__: to create, edit, deploy and retrieve Kevoree models
 * and a runtime, __kevoree-nodejs-runtime__ or __kevoree-browser-runtime__: to actually run some code on the Kevoree platform
 
### Step1: kevoree web editor
__IMPORTANT__: be sure to have a __Java JDK__ installed on your machine and copy the fullpath to it before running install.sh script  
You will need to give it to the installation wizard

```sh
mkdir kevoree-js
cd $_
git clone git@github.com:maxleiko/kev-web-editor
cd kev-web-editor
sh install.sh
cd org.kevoree.tools.editor.web
npm start
```

Yay, now you have the __Kevoree Web Editor__ up and running on your machine. You can play with it at http://localhost:3042/ (by default)

### Step2: kevoree-nodejs-runtime or kevoree-browser-runtime
> This choice is up to you, you can either use NodeJS platform or your browser.

In this example, I'll choose the browser platform.

```sh
cd ../..
mkdir kevoree-browser-runtime
cd $_
npm install kevoree-browser-runtime
cd node_modules/kevoree-browser-runtime
sh run.sh
```

Now you should have a new web server up and running on your machine. Actually, kevoree-browser-platform uses a server that has its own Kevoree NodeJS platform server-side and provides a kevoree-browser-runtime client-side.  
So, if you open Google Chrome (only works on recent Google Chrome browser) to http://localhost:42042/ you will have access to your own kevoree browser runtime.

![kev-browser-runtime_start](http://i43.tinypic.com/2zqg9dv.png "Kevoree Browser Runtime")

Choose a node name to bootstrap on, here 'node0', then press "Start" and "Deploy".

![kev-browser-runtime_deployed](http://i42.tinypic.com/2cgikgh.png "Kevoree Browser Runtime Deployed")

If you get the "Model deployed successfully" you have just created a new Kevoree runtime that runs in your browser! Awesome, huh?  

__WHY DID I INSTALLED & RUN KEV-WEB-EDITOR?__  
Well, that's a good question. In fact, you should open it now, and follow those actions:  

 * File > Open from node
 * Choose 'ws' protocol
 * Write 'localhost:8000' next to 'ws' protocol.
 * Click 'Open'
 
By doing so, Kevoree Web Editor will retrieve the model that runs on your own Kevoree Runtime (server-side).  
So, you should have something like that in the editor:

![kev-web-editor](http://i42.tinypic.com/30cykjo.png "Pulled model from server-side Kev runtime in Kev editor")