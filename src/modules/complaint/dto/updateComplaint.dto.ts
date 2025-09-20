import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateComplaintDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  reason?: string
}
