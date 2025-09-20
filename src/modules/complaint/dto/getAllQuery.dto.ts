import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional } from "class-validator";

export class GetAllQueryComplaintDto {

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  postId: number
}
