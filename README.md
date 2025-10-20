## NESTJS + PRISMA + POSTGRESQL

## Init source

nest new nestjs-app-base

## Change CRLF To LF

npx prettier --write .

## Create Module

nest g module modules/module_name

## Create Controller

nest g controller modules/controller_name

## Create Service

nest g service modules/service_name

## Class Validator (Dto)

npm install class-validator

## Class Transformer

npm install class-transformer

## Swagger

npm install --save @nestjs/swagger swagger-ui-express

## ConfigModule

npm install @nestjs/config

## Prisma

npm install prisma --save-dev
npm install @prisma/client

# Init Prisma

npx prisma init

# Migration Prisma

npx prisma migrate dev --name init

# Generate Prisma

npx prisma generate

## Cors

npm install cors
