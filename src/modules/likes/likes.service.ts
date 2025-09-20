import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/Database/prisma.service';
import { LikeDto } from './dto/like.dto';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) { }

  async like(payload: LikeDto, req: Request) {

    const ip: string = req.headers['x-forwarded-for']?.toString().split(',')[0] ?? req.socket.remoteAddress ?? '';

    const existingLike = await this.prisma.like.findFirst({ where: { ip, postId: payload.postId } });

    const post = await this.prisma.post.findUnique({ where: { id: payload.postId } });

    if (!post) {
      throw new NotFoundException({ success: false, message: 'Post not found!' });
    }

    if (!existingLike) {

      if (payload.like) {
        await this.prisma.post.update({ where: { id: payload.postId }, data: { likeCount: { increment: 1 } } });
      }

      await this.prisma.like.create({ data: { ...payload, ip } });

      return { success: true, message: 'Like success saved!' };
    }

    if (existingLike.like !== payload.like) {

      if (payload.like) {
        await this.prisma.post.update({ where: { id: payload.postId }, data: { likeCount: { increment: 1 } } });
      } else {
        await this.prisma.post.update({ where: { id: payload.postId }, data: { likeCount: { decrement: 1 } } });
      }

      await this.prisma.like.update({ where: { id: existingLike.id }, data: { like: payload.like } });
    }

    return { success: true, message: 'Like success updated!' };

  }
}
