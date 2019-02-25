# ouphello: A CKEditor Plugin Module

![alt text](https://github.com/ml2439/ouphello/blob/master/README-3.png "Result")

## Usage

In CloudCMS, go to "Manage Platform" -- "Modules" -- "Register New Module"
![alt text](https://github.com/ml2439/ouphello/blob/master/README-1.png "Register Module")

Note that ID is the module name, Sourth URL is the github link (that you use to clone the repo), and Source Path is the path to where module.json sits, which in this case, is null.

#### Dev Usage

If hope to debug the module without having to push to github repo per change made, mount it in Docker:
![alt text](https://github.com/ml2439/ouphello/blob/master/README-2.png "Docker Mount")

Likewise, the local path points to where module.json sits, which is /Users/cl/Documents/Modules/ouphello in this case.

## Create your own...

1. Name the module in module.json
2. Make sure when requiring, put '.js' at the end!
3. In helper.js, pluginPath is the path to where plugin.js sits
4. Register the plugin