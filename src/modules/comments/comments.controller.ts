import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/CrateCommentDto';
import { UpdateCommentDto } from './dto/UpdateCommentDto';

@Controller('comments')
export class CommentsController {

  constructor(private readonly commentService: CommentsService) { }

  @ApiOperation({ summary: 'Bita postga oid hamma comentlarni olish !' })
  @Get('all/:postId')
  getAll(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentService.getAll(postId)
  }


  @ApiOperation({ summary: 'Bita postga yangi comment yaratish !' })
  @Post('create')
  create(@Body() payload: CreateCommentDto, @Req() req: Request | any) {
    return this.commentService.create(payload, req)
  }


  @ApiOperation({ summary: 'Mavjud comment ni yangilash !' })
  @Put('update/:id')
  update(@Body() payload: UpdateCommentDto, @Param('id', ParseIntPipe) id: number, @Req() req: Request | any) {
    return this.commentService.update(payload, id, req)
  }


  @ApiOperation({ summary: "Mavjud commentni o'chirish !" })
  @Delete('delete/:id')
  delete(@Param('id', ParseIntPipe) id: number, @Req() req: Request | any) {
    return this.commentService.delete(id, req)
  }
}
