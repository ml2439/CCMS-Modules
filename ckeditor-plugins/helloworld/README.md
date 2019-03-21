# Custom "Hello World!" CKEditor Plugin

This plugin is a custom button in CKEditor that prints "Hello World!" in the editor's text area once pressed.

To use this module, you must deploy it to your platform.

## Installation

Deploy this module to your Cloud CMS Platform (Manage Platform > Modules > Register New Module)

    ID: helloworld
    Source Type: GitHub
    Source URL: https://github.com/gitana/sdk.git
    Path: /ui/modules/ckeditor-plugins/helloworld

## Test it out

Create a project and a content model with a CKEditor field. When you create a new content instance of that type, a globe button shows up in your ckeditor. Once you click it, it prints out "Hello World!"
![alt text](https://github.com/gitana/sdk/blob/master/ui/modules/ckeditor-plugins/helloworld/demo.png "Demo")
