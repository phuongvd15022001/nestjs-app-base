import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { GLOBAL_CONFIG } from 'src/configs/global.config';
import { MESSAGES } from 'src/shared/constants/message.constants';

@Injectable()
export class S3Service {
  private s3: S3Client;
  constructor() {
    this.s3 = new S3Client({
      region: GLOBAL_CONFIG.aws.region as string,
      credentials: {
        accessKeyId: GLOBAL_CONFIG.aws.aws_access_key_id as string,
        secretAccessKey: GLOBAL_CONFIG.aws.aws_secret_access_key as string,
      },
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const fileNameParts = file.originalname.split('.');
    const fileExtension =
      fileNameParts.length > 1 ? fileNameParts[fileNameParts.length - 1] : null;
    const s3FileName =
      `${new Date().getTime()}` + (fileExtension ? `.${fileExtension}` : '');

    const command = new PutObjectCommand({
      Bucket: GLOBAL_CONFIG.aws.s3.bucket,
      Key: s3FileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    });

    return this.sendCommand(command);
  }

  async sendCommand(command: PutObjectCommand) {
    const response = await this.s3.send(command);

    let location: string;
    if (response.$metadata.httpStatusCode === HttpStatus.OK) {
      location = this.getFileLocation(command.input.Key as string);
    } else {
      throw new UnprocessableEntityException(MESSAGES.CAN_NOT_UPLOAD_FILE);
    }

    return {
      location,
      key: command.input.Key,
    };
  }

  private getFileLocation(key: string) {
    return `https://${GLOBAL_CONFIG.aws.s3.bucket}.s3.${GLOBAL_CONFIG.aws.region}.amazonaws.com/${key}`;
  }
}
