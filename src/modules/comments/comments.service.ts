import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { ensureWithin5Minutes } from 'src/core/utils/with5minuts';
import { PrismaService } from 'src/Database/prisma.service';
import { CreateCommentDto } from './dto/CrateCommentDto';
import { UpdateCommentDto } from './dto/UpdateCommentDto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) { }


  async getAll(postId: number) {
    const data = await this.prisma.post.findMany({
      where: {
        id: postId
      },
      select: {
        id: true,
        authorName: true,
        likeCount: true,
        text: true,
        viewCount: true,
        comments: true
      },
    })

    if (data.length === 0) {
      throw new NotFoundException({ success: false, message: 'Comment not found !' })
    }

    return { success: true, data }
  }


  async create(payload: CreateCommentDto, req: Request) {

    const ip: string = req.headers['x-forwarded-for']?.toString().split(',')[0] ?? req.socket.remoteAddress ?? '';

    const post = await this.prisma.post.findUnique({ where: { id: payload.postId } })

    if (!post) {
      throw new NotFoundException({ success: false, message: 'Post not found !' })
    }
    payload.text = payload.text.trim()
    payload.authorName = payload.authorName ? payload.authorName.trim() : payload.authorName

    await this.prisma.comment.create({ data: { ...payload, ip } })
    return { success: true, message: 'Comment success created !' }
  }


  async update(payload: UpdateCommentDto, id: number, req: Request) {

    const ip: string = req.headers['x-forwarded-for']?.toString().split(',')[0] ?? req.socket.remoteAddress ?? '';

    const comment = await this.prisma.comment.findUnique({ where: { id } })

    if (!comment) {
      throw new NotFoundException({ success: false, message: 'Comment not found !' })
    }

    if (comment.ip !== ip) {
      throw new ForbiddenException({ success: false, message: 'You do not have permission to edit this comment !' })
    }

    ensureWithin5Minutes(comment.createdAt)

    if (payload.text) {
      payload.text = payload.text.trim()
      if (payload.text.length === 0) {
        throw new BadRequestException('textda bosh bolsihi kk')
      }
    }

    if (payload.authorName) {
      payload.authorName = payload.authorName.trim()
      if (payload.authorName.length === 0) {
        throw new BadRequestException('authornameda bosh bolsihi kk')
      }
    }

    await this.prisma.comment.update({ where: { id }, data: payload })
    return { success: true, message: 'Comment success updated !' }
  }


  async delete(id: number, req: Request) {
    const comment = await this.prisma.comment.findUnique({ where: { id } })

    if (!comment) {
      throw new NotFoundException({ success: false, message: 'Comment not found !' })
    }

    const ip: string = req.headers['x-forwarded-for']?.toString().split(',')[0] ?? req.socket.remoteAddress ?? '';

    if (comment.ip !== ip) {
      throw new ForbiddenException({ success: false, message: 'You do not have permission to delete this comment !' })
    }

    ensureWithin5Minutes(comment.createdAt)

    await this.prisma.comment.delete({ where: { id } })
    return { success: true, message: 'Comment success deleted !' }
  }
}
