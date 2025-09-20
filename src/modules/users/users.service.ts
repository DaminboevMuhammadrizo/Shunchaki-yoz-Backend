import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async getAll() {
    const users = await this.prisma.users.findMany()

    if (users.length === 0) {
      throw new NotFoundException({ success: false, message: 'Users not found !' })
    }

    return { success: true, data: users }
  }

  async getOne(id: number) {
    const user = await this.prisma.users.findUnique({ where: { id } })

    if (!user) {
      throw new NotFoundException({ success: false, message: 'User not found !' })
    }

    return { success: true, data: user }
  }
}
