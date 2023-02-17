# Home Library Service

# ИЗМЕНИТЬ ВИДИМОСТЬ РЕПОЗИТОРИЯ

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading, change directory and change branch

```
git clone https://github.com/kosta4310/nodejs2022Q4-service.git
cd nodejs2022Q4-service
git checkout branch/containerization
```

## Installing NPM modules

```
npm install
```

## Running docker container

you must have the docker running

```
docker-compose up
```

### To run all tests

```
npm run test
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### For scan images for security vulnerabilities

```
npm run scan
```
