import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsInt } from "class-validator"

export class LikeDto {

  @ApiProperty()
  @IsInt()
  postId: number

  @ApiProperty()
  @IsBoolean()
  like: boolean
}
