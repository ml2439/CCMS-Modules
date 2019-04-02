# custom-folder module

This module shows you how to customize an action in CloudCMS.

## Installation

Deploy this module to your Cloud CMS Platform (Manage Platform > Modules > Register New Module)

    ID: custom-folder
    Source Type: GitHub
    Source URL: https://github.com/ml2439/CCMS-Modules.git
    Path: /custom-folder/

# Steps
1. Create a user in the platform
2. Create a new project
3. Create content models custom:book and custom:fiction
4. Create a team myeditors
5. Assign the user to team myeditors and project owner
6. Create a folder of type custom:book
7. As the user, go into folder custom:book and from there create a folder
8. Notice that the folder type options field is now hidden and the value is actually custom:fiction as we configured in new-folder-types.json