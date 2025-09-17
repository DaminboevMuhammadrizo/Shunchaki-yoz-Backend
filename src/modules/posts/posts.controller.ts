import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreatePostDto, GetAllQueryPostsDto, UpdatePostDto } from './dto/post.dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) { }

  @Get('all')
  @ApiOperation({ summary: 'Get all posts' })
  getAll(@Query() query: GetAllQueryPostsDto) {
    return this.postService.getAll(query);
  }

  @Get('one/:id')
  @ApiOperation({ summary: 'Get a single post by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getOne(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new post' })
  @ApiBody({ type: CreatePostDto })
  create(@Body() payload: CreatePostDto, @Req() req: Request | any) {
    return this.postService.create(payload, req);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update an existing post' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiBody({ type: UpdatePostDto })
  update(
    @Body() payload: UpdatePostDto,
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request | any,
  ) {
    return this.postService.update(id, payload, req);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  delete(@Param('id', ParseIntPipe) id: number, @Req() req: Request | any) {
    return this.postService.delete(id, req);
  }
}
