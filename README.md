# Kevoree JS ![Kevoree](http://kwe.braindead.fr/images/logo.png)

## Project description
__kevoree-js__ provides several tools in order to use **[Kevoree](http://kevoree.org)** in **Javascript**.  
The idea behind that is to provided (for now) two Javascript containers for Kevoree:  

 * __NodeJS__: command-line Kevoree runtime
 * __Browser__: Kevoree runtime within your browser (actually, you'll need a browser that handles the new FileSystem API, like Google Chrome for instance :) )

## Getting started
#### Requirements & Installation
In order to create your own Kevoree JS component you will need them:  
 
  * [NodeJS](https://github.com/joyent/node/wiki/Installation) - Platform built on Chrome's JavaScript runtime
  * [GruntJS](http://gruntjs.com/getting-started) - The JavaScript Task Runner
  * [Yeoman](http://yeoman.io/gettingstarted.html) - The Web's scaffolding tool for modern webapps

Now that you've installed **Node**, **Grunt** and **Yo**, you should be able to do that:  
```sh
$ node -v
v0.10.26
```
```sh
$ grunt --version
grunt-cli v0.1.13
```
```sh
$ yo -v
1.1.2
```
In order to build your own first **Kevoree** component you will need to install our `yo` generator.  
This **yeoman** generator will create for you a clean project architecture with everything you need to get started :)  
Let's install it:  
```sh
npm install -g generator-kevoree
```
  > Note that this is a **global** install of `generator-kevoree`, so you'll most likely need 'root' priviledges
  
## Create your first component
#### Naming your library
`kevoree-js` libraries follow a **naming convention** in order to find them on **npm**'s registry. The convention is as follow: 

 * nodes: `kevoree-node-yournodename`
 * groups: `kevoree-group-yourgroupname`
 * channels: `kevoree-chan-yourchannelname`
 * components: `kevoree-comp-yourcomponentname`
 
Because we are going through a **component** creation, let's create a `kevoree-comp-helloworld` directory
```sh
mkdir kevoree-comp-helloworld
cd $_
```

#### Scaffold your project using yeoman & generator-kevoree
```sh
yo kevoree
```
![yo kevoree](http://i62.tinypic.com/255nhfq.png)

Now you should answer `comp`, then `HelloWorld`, and **yo** will scaffold the whole project for you.

#### Let's try out your new awesome component
Yes, that's all you need to get started actually, you can start a new **Kevoree** runtime to try out your fresh new component.
```sh
grunt kevoree
```
> This **grunt** task will do all the work needed in order to start a NodeJS Kevoree runtime containing your newly created component

![grunt kevoree](http://i57.tinypic.com/2u4qbgx.png)

You can see in the logs that your component `HelloWorld` has been started within the **Kevoree NodeJS Runtime**


#### Kevoree model overview using Kevoree Web Editor

Because you used `grunt kevoree`, your model has been added within the default **JavascriptNode** container. This node is also attached to a **WebSocketGroup**.  
You can now see your own architecture model using **Kevoree Web Editor**, open your browser to this address  
http://kwe.braindead.fr/?host=127.0.0.1&port=9000

## Enhance your component
#### Create a dictionary attribute
Okay let's try to improve your component a bit. Open the file `lib/HelloWorld.js` in your favorite IDE.  
What we will do is add a **dictionary attribute** in order to set an "Hello world" message dynamically using **Kevoree's Model@Runtime** mechanism.  
Attributes follow pretty simple naming convention of **dic_yourAttributeName**, let's have a look at that in the code.

Line 14 you have a commented example of dictionary attribute. 
```js
/* This is an example of dictionary attribute that you can set for your entity */
//dic_yourAttrName: {
//  optional: true,
//  defaultValue: false
//},
```
Let's uncomment it and tweak it a bit 
```js
/* This attribute is used to display a message to user
 * within the console on component start-up
 */
dic_myMsg: {
  optional: true,
  defaultValue: 'Hello world'
},
```
Let's see what happens if you re-run the `grunt kevoree` task...  
```sh
grunt kevoree
```

Yes, nothing new. Well, not exactly...  
If you re-open your browser to http://kwe.braindead.fr/?host=127.0.0.1&port=9000 you can see a little difference.  
Not directly in the displayed model, but if you click on your component, its properties will show up. Within its dictionary attributes, you will be able to see the **myMsg** attribute, with the "Hello world" default value set.  
This simply means that you are now able to apply some reconfiguration to your component using **Kevoree Web Editor**.  

But, we didn't handle the new attribute. So let's do it right now.  

#### Managing dictionary attributes
Back to your IDE, scroll a bit to the `start()` function. This function is called by **Kevoree** when it has to start your component, that's the reason why you saw in the logs `11:37:22 DEBUG HelloWorld START`. Because it contains a call to Kevoree's Logger.  

What we would like to do is displaying the default attribute value on start (if none set).
```js
/* This attribute is used to display a message to user
 * within the console on component start-up
 */
dic_myMsg: {
  optional: true,
  defaultValue: 'Hello world'
},

start: function (_super) {
    _super.call(this);
    this.log.debug(this.toString(), this.dictionary.getValue('myMsg'));
},
```

Any **Kevoree JS** entity (node, group, channel and component) can retrieve its dictionary at runtime by calling `this.dictionary`  
We can sum up Dictionary's API as:  
```js
this.dictionary = {
  map: { /* attrName: attrValue, etc. */ }
  getValue: function (attrName) {
    return this.map[attrName];
  },
  setValue: function (attrName, value) {
    // updates Kevoree model and dictionary instance with the new value
  },
  on: function (attrName, callback) {
    // when a change event occurs on 'attrName' (ie. new value set)
    // call callback.bind(yourEntity)(newVal, oldVal)
    // for convenience purpose, callback is bound to yourEntity
  }
};
```

So, in order to display the new message on each modifications, we need to add a listener on the new attribute
```js
/* This attribute is used to display a message to user
 * within the console on component start-up
 */
dic_myMsg: {
  optional: true,
  defaultValue: 'Hello world'
},

start: function (_super) {
    _super.call(this);
    this.log.debug(this.toString(), this.dictionary.getValue('myMsg'));
    
    // add a listener to display the new message on each changes
    this.dictionary.on('myMsg', function (newVal, oldVal) {
      // for convenience purpose, "this" keyword here is bound to "your" entity
      // which is, here, your HelloWorld component instance
      this.log.debug(this.toString(), 'oldVal='+oldVal+', newVal='+newVal);
    });
},
```

Time to try this out!  
```sh
grunt kevoree
```

![attr default value](http://i59.tinypic.com/280ms0p.png)  
You can see that, now, prompted message is your attribute's default value "Hello world"  

Go back to **Kevoree Web Editor**, refresh the page, and click on your component **myComp**.  
You can change the value of your attribute `myMsg` to whatever you want.  
Apply the changes by pressing "Enter" or clicking "Save changes".  

![editor change attribute](http://i61.tinypic.com/142e8ts.png)  

Then, click on the node that host your component **node0**. A node in Kevoree will let you send (push) and retrieve (pull) model from the node platform. So, if you click on the **Push** it will send the new model (containing your **myMsg** attribute's value changes) to the node that host your component.

![push changes](http://i59.tinypic.com/35hgx0x.png)  

And now you can witness the **Model@Runtime** magic within your terminal.

![attribute update m@r](http://i59.tinypic.com/28s52kx.png)

#### Creating input and output ports : chit chat 101
In **Kevoree**, components can **receive** and **send** messages to others using **ports** (inputs and outputs).  
In order to add a port to your component, you just have to create a new property for your HelloWorld class (pretty much like a dictionary attribute) following the right naming convention of **in_yourInputPortName** or **out_yourOutputPortName**.  

In this tutorial, you are going to create a new **output** port called `greet` that will send the content of **myMsg** attribute to whoever is connected each time a change to this attribute occurs.  

Let's go back to the code!  
```js
/**
 * Kevoree component
 * @type {HelloWorld}
 */
var HelloWorld = AbstractComponent.extend({
    toString: 'HelloWorld',

    // ...

    /* That's all you need to create a new output port :) */
    out_greet: function (msg) {}
});

module.exports = HelloWorld;
```
Just like dictionary attribute, creating a new port is pretty straightforward. You just have to add a new *well-named* property to your class, and here you go.  
If you re-run your project using `grunt kevoree`, you'll be able to see the changes in the **Kevoree Web Editor**  

```sh
grunt kevoree
```

![output port](http://i59.tinypic.com/25jf30g.png)  

The red dot on the right of your component is the representation of your **output port**.  
Ports can be connected to **Channels** in Kevoree, so it means that you are going to need to add another entity to your model.  
And it is a good thing because I didn't speak about **KevScript** yet!

But first, let's also create an **input port**, called `inMsg` that will print the received message in the console. 

Let's go back to the code *again*!  
```js
/**
 * Kevoree component
 * @type {HelloWorld}
 */
var HelloWorld = AbstractComponent.extend({
    toString: 'HelloWorld',

    // ...

    /* That's all you need to create a new output port :) */
    out_greet: function (msg) {},
    
    /* Input port: changes the content of attribute "myMsg" on each received message */
    in_changeMsg: function (msg) {
      // TODO
    }
});

module.exports = HelloWorld;
```

#### Using input & output ports
All set! We can now add the logic within your component!  
First of all, do the changes for `greet` output port.
```js
/**
 * this method will be called by the Kevoree platform when your component has to start
 */
start: function (_super) {
    _super.call(this);
    var msg = this.dictionary.getValue('myMsg');
    // log myMsg to the console on start-up
    this.log.debug(this.toString(), msg);
 
    // add a listener to display the new message on each changes
    this.dictionary.on('myMsg', function (newVal, oldVal) {
        this.log.debug(this.toString(), 'oldVal='+oldVal+', newVal='+newVal);
        // also send the new value to whoever is connected to my output port "greet"
        this.out_greet(newVal);
    });
},
```
And then, do the changes for `inMsg` input port.

```js
/* Input port: prints to the console the received message */
in_inMsg: function (msg) {
    this.log.debug(this.toString(), this.getName()+' received '+msg);
}
```

#### Connect ports - Modify bootstrap model with KevScript
In order to connect ports together you will need a Kevoree **Channel** instance.  
**Kevoree** provides several standard libraries for the different types. Currently, your model uses **JavascriptNode** and **WebSocketGroup** which are part of the Kevoree JS Standard Library.  
To connect your new component's ports to a channel, you can use **WebSocketChannel**.  
To do so, go back to your IDE, and open `kevs/main.kevs`. This file is used by `grunt kevoree` to create the model you are using in your runtime. It should look like that:  
```
// This file is a default Kevoree Kevscript auto-generated by Yo generator-kevoree package
// Feel free to (and you really should) mess with this script =)
// KevScript documentation http://kevoree.org/doc/#kevoree-script-aka-kevscript
include npm:kevoree-node-javascript
include npm:kevoree-group-websocket
include npm:kevoree-comp-helloworld // this is your own project package

add node0 : JavascriptNode
add sync : WebSocketGroup
add node0.myComp : HelloWorld

attach node0 sync

set sync.port/node0 = "9000"
```
You can have a look at the [Kevscript Documentation](http://kevoree.org/doc/#kevoree-script-aka-kevscript).  

Apply the following modifications in order to have an instance of **WebSocketChannel** added to your bootstrap model.  
```
// This file is a default Kevoree Kevscript auto-generated by Yo generator-kevoree package
// Feel free to (and you really should) mess with this script =)
// KevScript documentation http://kevoree.org/doc/#kevoree-script-aka-kevscript
include npm:kevoree-node-javascript
include npm:kevoree-group-websocket
include npm:kevoree-comp-helloworld // this is your own project package

add node0 : JavascriptNode
add sync : WebSocketGroup
add node0.myComp : HelloWorld

attach node0 sync

set sync.port/node0 = "9000"

// this tells KevScriptEngine that it will need to resolve the library from npm registry
include npm:kevoree-chan-websocket

// this will add two WebSocketChannel instances called "myChan0" and "myChan1" to your model
add myChan0, myChan1 : WebSocketChannel

// add another component to node0 to spice up the model
add node0.myComp2 : HelloWorld

// connect node0.myComp.greet output port to myChan0
bind node0.myComp.greet myChan0
// connect node0.myComp.inMsg input port to myChan1
bind node0.myComp.inMsg myChan1

// connect node0.myComp2.greet output port to myChan1
bind node0.myComp2.greet myChan1
// connect node0.myComp2.inMsg input port to myChan0
bind node0.myComp2.inMsg myChan0

// set attributes for your newly added channels
set myChan0.port/node0 = '9001'
set myChan1.port/node0 = '9002'
```

Using **Kevoree Web Editor** to check the model you should see something that looks like that:  
![Full model](http://i62.tinypic.com/2hnlug0.png)  
If you change the content of **myComp** attribute **myMsg** to `yourMessage` and then **push** the model you should see a message in the console saying: `myComp2 received yourMessage`.  
It means that **myComp** send the content of its attribute through its output **greet** port to **myChan0**. And, because **myComp2** input **inMsg** port is also connected to this chan (myChan0) it received the message and so printed it.  

Now you should be able to make your own kind of awesome component =) Have fun