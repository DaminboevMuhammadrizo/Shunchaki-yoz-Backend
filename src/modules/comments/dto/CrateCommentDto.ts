import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsOptional, IsString } from "class-validator"

export class CreateCommentDto {

  @ApiProperty()
  @IsInt()
  postId: number

  @ApiProperty()
  @IsString()
  @IsOptional()
  authorName?: string

  @ApiProperty()
  @IsString()
  text: string
}
