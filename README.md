# 4G/5G Bands & Combos UI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.

## Environments

* Production https://cacombos.com
* Stage https://stage.caocmbos.com

## Build & Deploy to production

Clone Repository

```
git clone https://github.com/cacombos/cacombos-ui.git
```

### Docker

Use Docker and Docker Compose to set up production enviroment.

```
docker build -t cacombos/cacombos-ui .
```

## Without Docker

Requirements:

* NodeJS 14
* Angular CLI
* Yarn

Install Node packages and start server.

```
yarn
yarn build:ssr
yarn run serve:ssr
```

## Development

Just click below to start development in Gitpod. You must register to service with your Github account.

[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://gitpod.io/#https://github.com/cacombos/cacombos-ui)

### Docker

Build, install Node-modules and start dev environment.

```
docker-compose build
docker-compose up -d
```

You can then modify files locally and see changes via browser https://localhost:4200

### Without Docker

Requirements:

* NodeJS 14
* Angular CLI
* Yarn

Run `yarn` to install Node-modules

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.