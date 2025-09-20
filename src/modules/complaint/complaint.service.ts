import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { ensureWithin5Minutes } from 'src/core/utils/with5minuts';
import { PrismaService } from 'src/Database/prisma.service';
import { CreateComplaintDto } from './dto/createComplaint.dto';
import { UpdateComplaintDto } from './dto/updateComplaint.dto';

@Injectable()
export class ComplaintService {
  constructor(private readonly prisma: PrismaService) { }

  async getAll(postId: number) {
    const complaint = await this.prisma.complaint.findMany({
      where: {
        postId
      },
      select: {
        id: true,
        postId: true,
        reason: true,
      }
    })

    if (complaint.length === 0) {
      throw new NotFoundException({ success: false, message: 'Complaint not found !' })
    }

    return { success: true, data: complaint }
  }


  async getOne(id: number) {
    const complaint = await this.prisma.complaint.findUnique({
      where: { id },
      select: {
        id: true,
        postId: true,
        reason: true
      }
    })

    if (!complaint) {
      throw new NotFoundException({ success: false, message: 'Complaint nor found !' })
    }

    return { success: true, data: complaint }
  }


  async create(payload: CreateComplaintDto, req: Request) {
    const post = await this.prisma.post.findUnique({ where: { id: payload.postId } })

    if (!post) {
      throw new NotFoundException({ success: false, message: 'Post not found !' })
    }

    if (payload.reason.trim().length === 0) {
      throw new BadRequestException({ success: false, message: 'Complaint cannot be empty !' })
    }

    const ip: string = req.headers['x-forwarded-for']?.toString().split(',')[0] ?? req.socket.remoteAddress ?? '';

    await this.prisma.complaint.create({ data: { ...payload, ip } })
    return { success: true, message: 'Complaint success sended !' }
  }


  async update(id: number, payload: UpdateComplaintDto, req: Request) {
    const complaint = await this.prisma.complaint.findUnique({ where: { id } })

    if (!complaint) {
      throw new NotFoundException({ success: false, message: 'Complaint not found !' })
    }

    if (payload.reason) {
      if (payload.reason.trim().length === 0) {
        throw new BadRequestException({ success: false, message: 'Complaint cannot be empty !' })
      }
    }

    const ip: string = req.headers['x-forwarded-for']?.toString().split(',')[0] ?? req.socket.remoteAddress ?? '';

    if (complaint.ip !== ip) {
      throw new ForbiddenException({ success: false, message: 'You do not have permission to edit this complaint !' })
    }

    ensureWithin5Minutes(complaint.createdAt)

    await this.prisma.complaint.update({ where: { id }, data: payload })
    return { success: true, message: 'Complaint success updated !' }
  }

  async delete(id: number, req: Request) {

    const complaint = await this.prisma.complaint.findUnique({ where: { id } })

    if (!complaint) {
      throw new NotFoundException({ success: false, message: 'Complaint not found !' })
    }

    const ip: string = req.headers['x-forwarded-for']?.toString().split(',')[0] ?? req.socket.remoteAddress ?? '';

    if (complaint.ip !== ip) {
      throw new ForbiddenException({ success: false, message: 'You do not have permission to edit this complaint !' })
    }

    ensureWithin5Minutes(complaint.createdAt)

    await this.prisma.complaint.delete({ where: { id } })
    return { success: true, message: 'Complaint success deleted !' }
  }
}
