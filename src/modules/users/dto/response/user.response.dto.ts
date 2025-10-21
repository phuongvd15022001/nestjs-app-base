import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProductResponseDto } from 'src/modules/products/dto/response/product.response.dto';

export class UserResponseDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @Expose()
  id: number;

  @ApiProperty({ example: 'Jon', description: 'User Name' })
  @Expose()
  name: string;
}

export class UserWithProductResponseDto extends UserResponseDto {
  @ApiProperty({ type: [ProductResponseDto], description: 'User products' })
  @Expose()
  @Type(() => ProductResponseDto)
  Product?: ProductResponseDto[];
}
