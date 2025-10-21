# NESTJS + PRISMA + POSTGRESQL

## Init Source

```bash
nest new nestjs-app-base
```

## Start App

```bash
npm run start:dev
```

## Change CRLF To LF

```bash
npx prettier --write .
```

## Create Module

```bash
nest g module modules/module_name
```

## Create Controller

```bash
nest g controller modules/controller_name
```

## Create Service

```bash
nest g service modules/service_name
```

## Class Validator (Dto)

```bash
npm install class-validator
```

## Class Transformer

```bash
npm install class-transformer
```

## Swagger

```bash
npm install --save @nestjs/swagger swagger-ui-express
```

## ConfigModule

```bash
npm install @nestjs/config
```

## Prisma

```bash
npm install prisma --save-dev
npm install @prisma/client
```

### Init Prisma

```bash
npx prisma init
```

### Migration Prisma

```bash
npx prisma migrate dev --name init
```

### Generate Prisma

```bash
npx prisma generate
```

## Cors

```bash
npm install cors
```

## Seed Prisma

```bash
npx prisma db seed
```

## Dayjs

```bash
npm install dayjs
```

## Authentication and Authorization

```bash
npm install @nestjs/jwt
npm install @nestjs/passport passport
npm install passport-jwt
npm install passport-local
```

## Send Mail

```bash
npm install --save @nestjs-modules/mailer nodemailer
```
