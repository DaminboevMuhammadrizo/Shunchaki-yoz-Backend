import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsString } from "class-validator"

export class CreateComplaintDto {

  @ApiProperty()
  @IsInt()
  postId: number

  @ApiProperty()
  @IsString()
  reason: string
}
