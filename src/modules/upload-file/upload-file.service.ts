import { Injectable } from '@nestjs/common';
import { S3Service } from 'src/services/s3/s3.service';
import { MAX_FILE_SIZE } from 'src/shared/constants/global.constants';
import { checkFileSize, checkMimeType } from 'src/shared/helpers/file.helpers';

@Injectable()
export class UploadFileService {
  constructor(private s3Service: S3Service) {}

  async upload(file: Express.Multer.File) {
    checkMimeType(file);
    checkFileSize(file, MAX_FILE_SIZE);

    const res = await this.s3Service.uploadFile(file);
    return res.location;
  }
}
