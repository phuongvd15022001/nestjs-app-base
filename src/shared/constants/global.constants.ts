export const SHORT_DATE = 'YYYY-MM-DD';

export enum Environment {
  Development = 'development',
  Test = 'test',
  Production = 'production',
}

export const IMAGE_MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/webp',
];

export const ALLOW_MIME_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

export enum ERole {
  PUBLIC = 'PUBLIC',
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export const MAX_IMAGE_SIZE = 10; // MB
export const MAX_FILE_SIZE = 10;
