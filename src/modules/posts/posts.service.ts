import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { ensureWithin5Minutes } from 'src/core/utils/with5minuts';
import { PrismaService } from 'src/Database/prisma.service';
import { CreatePostDto, GetAllQueryPostsDto, UpdatePostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) { }

  async getAll(query: GetAllQueryPostsDto) {
    const take = query.limit ?? 10;
    const skip = query.offset ? (query.offset - 1) * take : 0;
    const where: any = {};

    query.text && (where.text = { contains: query.text, mode: 'insensitive' })

    const data = await this.prisma.post.findMany({ where, skip, take, select: { id: true, authorName: true, text: true, likeCount: true, viewCount: true, complaintCount: true, comments: true, likes: true, complaints: true, createdAt: true, updatedAt: true } })

    if (data.length === 0) {
      throw new NotFoundException({ success: false, message: 'Post not found !' })
    }

    return { success: true, data }
  }

  async getOne(id: number) {
    const data = await this.prisma.post.findUnique({ where: { id }, select: { id: true, authorName: true, text: true, likeCount: true, viewCount: true, complaintCount: true, comments: true, likes: true, complaints: true, createdAt: true, updatedAt: true } })

    if (!data) {
      throw new NotFoundException({ success: false, message: 'Post not found !' })
    }

    return { success: true, data }
  }


  async create(payload: CreatePostDto, req: Request) {
    const ip: string = req.headers['x-forwarded-for']?.toString().split(',')[0] ?? req.socket.remoteAddress ?? '';
    console.log(ip)

    await this.prisma.post.create({ data: { ...payload, ip } });

    return { success: true, message: 'Post success created !' };
  }


  async update(id: number, paylaod: UpdatePostDto, req: Request) {
    const post = await this.prisma.post.findUnique({ where: { id } })
    if (!post) {
      throw new NotFoundException({ success: false, message: 'Post not found !' })
    }

    const ip: string = req.headers['x-forwarded-for']?.toString().split(',')[0] ?? req.socket.remoteAddress ?? '';

    if (ip !== post.ip) {
      throw new ForbiddenException({ success: false, message: 'You do not have permission to update this post !' })
    }

    ensureWithin5Minutes(post.createdAt)
    await this.prisma.post.update({ where: { id }, data: paylaod })
    return { success: true, message: 'Post success updated !' };
  }

  async delete(id: number, req: Request) {
    const post = await this.prisma.post.findUnique({ where: { id } })
    if (!post) {
      throw new NotFoundException({ success: false, message: 'Post not found !' })
    }

    const ip: string = req.headers['x-forwarded-for']?.toString().split(',')[0] ?? req.socket.remoteAddress ?? '';

    if (ip !== post.ip) {
      throw new ForbiddenException({ success: false, message: 'You do not have permission to update this post !' })
    }

    ensureWithin5Minutes(post.createdAt)

    await this.prisma.post.delete({ where: { id } })
    return { success: true, message: 'Post success deleted !' };
  }
}
