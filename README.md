## Description

Build dynamic queries with prisma and elastic search:
- Usage:
  - Use the end points to pass parameter for building dynamic queries with prisma then search and sort with elastic search.
- End points:
  - GET prisma/:model
  - GET elasticsearch/:index
  - POST prisma/:model
  - PUT prisma/:model/:id
- Structure:
  - Decorators for create, update and query (src/decorators/)
  - DTO objects for create, update and query (src/dto)
  - Prisma service for db operations (src/prisma/)
  - Dynamic controller for endpoints (src/query/controller.ts)
  - Query service for db operations through prisma and search with elastic (src/query/service.ts)

## Installation

```bash
$ npm install
```

## Configuration

create .env file
add env for prisma -> DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
