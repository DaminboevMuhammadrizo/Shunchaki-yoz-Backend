import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class UpdateCommentDto {

  @ApiProperty()
  @IsString()
  @IsOptional()
  authorName?: string

  @ApiProperty()
  @IsString()
  text: string
}
