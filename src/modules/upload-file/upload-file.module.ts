import { Module } from '@nestjs/common';
import { UploadFileController } from './upload-file.controller';
import { S3Module } from 'src/services/s3/s3.module';
import { UploadFileService } from './upload-file.service';

@Module({
  imports: [S3Module],
  controllers: [UploadFileController],
  providers: [UploadFileService],
  exports: [UploadFileService],
})
export class UploadFileModule {}
