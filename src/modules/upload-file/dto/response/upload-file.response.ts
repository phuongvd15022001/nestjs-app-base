import { ResField } from 'src/shared/decorators/dto.decorator';

export class UploadResponseDTO {
  @ResField()
  url: string;
}
