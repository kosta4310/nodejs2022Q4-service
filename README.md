# Home Library Service

# ИЗМЕНИТЬ ВИДИМОСТЬ РЕПОЗИТОРИЯ

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading, change directory and change branch

```
git clone https://github.com/kosta4310/nodejs2022Q4-service.git
cd nodejs2022Q4-service
git checkout database-orm
```

## Installing NPM modules

```
npm install
```

## Add .env file

- Change a name of file .env.example to .env and change if nessesary a variables values

## Running docker container

you must have the docker desktop running

```
docker-compose up
```

## To run all tests, open a second terminal and perform follow command

```
npm run test
```

## Auto-fix and format

```
npm run lint
```

```
npm run format
```

## For scan images for security vulnerabilities

```
npm run scan

```

## For generate a new migration perform

```
npm run migration:generate -- db/migrations/Name_your_migration
```

## For running a new migration perform

```
npm run migration:run
```
