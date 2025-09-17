import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'This is a post text' })
  @IsString()
  text: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  authorName?: string;
}

export class UpdatePostDto extends PartialType(CreatePostDto) { }

export class GetAllQueryPostsDto {
  @ApiPropertyOptional({ example: 0, description: 'Pagination offset' })
  @IsOptional()
  @IsInt()
  offset: number;

  @ApiPropertyOptional({ example: 10, description: 'Pagination limit' })
  @IsOptional()
  @IsInt()
  limit: number;

  @ApiPropertyOptional({ example: 'search text', description: 'Text to filter posts' })
  @IsOptional()
  @IsString()
  text: string;
}
