import { ApiProperty } from '@nestjs/swagger';

export class UploadRequestDTO {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;
}
