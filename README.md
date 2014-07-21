# FitStats

> Tired of tracking your fitness data on lots of separate services? Use FitStats to collect all your fitness info from apps you already use, so you can track your progress and gain new insights in one convenient dashboard.

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Contributing](#contributing)
1. [License](#license)

## Usage

> To use FitStats, just head over to [fitstats.co](http://fitstats.co), sign up for a free account, and get started!

## Requirements
- Yeoman
- Grunt Command Line Tools
- MongoDB

## Development

See [CHANGELOG.md](CHANGELOG.md) for the latest software releases and changes.

FitStats is built using the [AngularJS Full-Stack Generator v2.0.4](https://github.com/DaftMonk/generator-angular-fullstack)

These are the generator parameters selected for FitStats:
####Client
- vanilla JS
- HTML markup
- CSS stylesheets
- angular ui-router

####Server
- MongoDB database (w/mongoose DRM)
- Authentication Boilerplate: Yes
- oAuth integrations: Facebook
- Socket.io integration: No



### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
#google-chart dependency will ask for Angular 1.3.x. Ignore it, and use Angular 1.2.x instead.
```

### Environment Variables
Keeping your app secrets and other sensitive information in source control isn't a good idea. To have grunt launch your app with specific environment variables, add them to the git ignored environment config file: `server/config/local.env.js`.

### [Injection](https://github.com/DaftMonk/generator-angular-fullstack#injection)

### [Generators](https://github.com/DaftMonk/generator-angular-fullstack#generators)

### [Project Structure](https://github.com/DaftMonk/generator-angular-fullstack#project-structure)

### [Testing](https://github.com/DaftMonk/generator-angular-fullstack/blob/master/readme.md#testing)
To run your local version of the app, do the following:
```sh
mongod #Mongo must be running
grunt serve
```

`grunt serve` will monitor your files for changes, but will not inject any new
dependencies (css files, js files, etc) into index.html for you. In order for them
to be added, you'll have to quit the process (Ctrl+C) and run `grunt serve` again.





## Tasks

See the projects backlog in Asana [here](https://app.asana.com/0/14549853388807/14549853388807)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Deployment (Microsoft Azure)
See [DEPLOYMENT.md](DEPLOYMENT.md) for instructions on how to setup your project for deployment on Microsoft Azure.
