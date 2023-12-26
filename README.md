## Table of Contents
- [Table of Contents](#table-of-contents)
- [Current Scope](#current-scope)
- [Project Status](#project-status)
- [Installation and Setup Instructions](#installation-and-setup-instructions)
- [Requirements](#requirements)
  - [Getting The Codebase:](#getting-the-codebase)
  - [Installation and Configuration:](#installation-and-configuration)
- [License](#license)

## Current Scope

A basic API collection for To-do App implementing all CRUD operations having the following functionalities:
* Add new to do for specific user.
* Update an existing to do for a specific user.
* Delete an existing to do for a specific user.
* Get to do information for a specific user.
* Get all to do for a specific user.

## Project Status

This project is currently under development. Users now can do the above functionalities, As per requirements of the task.

## Installation and Setup Instructions

You need the following requirements installed globally on your machine.

## Requirements
- Node.js >= v20.10.0
- npm >= v10.2.3
- MongoDB Server CE v7.0.4 or higher.
- Web Server: Apache2 or preferably NGINX in case of creating virtual host instead of specifying the port in URL rather than the default port 80.

### Getting The Codebase:

The simplest way to obtain the code is using the github .zip feature. Click [here](https://github.com/ahmadSaeedGoda/unifi-solutions-todo/archive/refs/heads/master.zip) to get the latest stable version as a .zip compressed file.

The recommended way is using `git`. You'll need to make sure `git version ~2.34.1` is installed on your machine. Use a terminal or Power Shell to visit the directory where you'd like to have the source code, then type in:
```sh
$ git clone https://github.com/ahmadSaeedGoda/unifi-solutions-todo.git
```

### Installation and Configuration:
- <b>Step 1:</b> Get the code. "As explained [above](#getting-the-codebase)".
- <b>Step 2:</b> Use npm to install dependencies as specified in available scripts section. Navigate to the root directory of the project you cloned or downloaded then run the following command to install required dependencies.
```sh
$ npm install
```
- <b>Step 3:</b> Create & Configure your database.<br>
If successfully the first two steps have been finished, now you can create the database on your database server(MongoDB).

- <b>Step 4:</b> Set the Environment Variables. Find the file named `.env.example` in the root directory of the project. Copy the file then rename the new one `.env` then set the environment variables listed below with values according to your environment respectively:
    - MONGODB_URI

- <b>Step 5:</b> Run `npm run dev` in the console after making sure the prompt points to the root directory of the project. So that you can have an up & running app server on the default port 3000 with `nodemon` for auto restart whenever you make any modifications to the code.

- <b>Step 6:</b> Run `npm start` in the console after making sure the prompt points to the root directory of the project to have production similar running server.<br><br>

However convenient for you to run the app for visiting the endpoints in an API client such as `postman`, `insomnia` or even `curl`.

<br>Note: A shared Postman collection is included/shared within the source code root directory, this can be imported and ready to use after changing the `base_url` variable as per your env. "In case you'd like to change the default"

For documentation see `Postman Collection` shared collection with Examples included in file in `Unifi-Solutions Todo App Assessment.postman_collection.json`.

Import the above file in `Insomnia` or `Postman`!

Now you can Create new To-do, then once a new one is created via the available request/endpoint .. Update an existing one, Deleting an existing one, Get a specified Todo, or Get all To-do for a pre-specified user can be achieved.

## License
This is free software distributed under the terms of the WTFPL license along with MIT license as dual-licensed, You can choose whatever works for you.
