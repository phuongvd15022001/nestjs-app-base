import { ApiPropertyOptional } from '@nestjs/swagger';
import { StringField } from 'src/shared/decorators/dto.decorator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Jon', description: 'User Name' })
  @StringField({ optional: true })
  name?: string;

  @ApiPropertyOptional({ example: 'jon@gmail.com', description: 'User Name' })
  @StringField({ optional: true })
  email?: string;
}
