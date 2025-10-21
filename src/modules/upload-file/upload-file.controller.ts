import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UploadFileService } from './upload-file.service';
import { UploadResponseDTO } from './dto/response/upload-file.response';
import { UploadRequestDTO } from './dto/request/upload-file.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { Roles } from 'src/auth/auth.roles.decorator';
import { ERole } from 'src/shared/constants/global.constants';

@ApiTags('Upload file')
@Controller('/upload')
export class UploadFileController {
  constructor(private uploadFileService: UploadFileService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(ERole.PUBLIC)
  @UseInterceptors(FileInterceptor('file'))
  @Post('/')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload file', deprecated: true })
  @ApiOkResponse({ type: UploadResponseDTO })
  @ApiBody({ type: UploadRequestDTO })
  async uploadGarbage(@UploadedFile() file: Express.Multer.File) {
    const url = await this.uploadFileService.upload(file);
    return { url };
  }
}
