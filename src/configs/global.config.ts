export const GLOBAL_CONFIG = {
  env: process.env.ENV,
  nest: {
    port: process.env.PORT,
  },
  swagger: {
    enabled: true,
    title: 'Nestjs Prisma Starter',
    description: 'The nestjs API description',
    version: '1.0',
    path: 'api/docs',
  },
  cors: {
    enabled: true,
    origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  },
  prisma: {
    soft_delete_model_names: ['Users'],
    // log_levels: process.env.PRISMA_LOG_LEVELS
    // ? process.env.PRISMA_LOG_LEVELS.split(',')
    // : [],
  },
  security: {
    jwt_secret: process.env.JWT_SECRET,
    // expiresIn: 3600 * 24, // 24h
    // bcryptSaltOrRound: 10,
  },
  logger: {
    // folder_path: process.env.LOG_FOLDER_PATH,
    // level: process.env.LOG_LEVEL,
  },
  external: {
    // frontend_url: process.env.FRONTEND_URL,
  },
  email: {
    // enable_aws_ses: process.env.ENABLE_AWS_SES === 'true',
    // from_email: process.env.EMAIL_FROM,
    server: {
      // service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
      // pool: true,
      // maxConnections: 5,
    },
  },
  aws: {
    aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
    aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
    s3: {
      bucket: process.env.AWS_S3_BUCKET,
    },
    region: process.env.AWS_REGION,
  },
};
