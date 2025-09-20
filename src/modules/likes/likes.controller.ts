import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { LikeDto } from './dto/like.dto';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likeService: LikesService) { }

  @ApiOperation({ summary: 'Like qoshish yoki ayrish !' })
  @Post('like')
  like(@Body() payload: LikeDto, @Req() req: Request | any) {
    return this.likeService.like(payload, req)
  }
}
