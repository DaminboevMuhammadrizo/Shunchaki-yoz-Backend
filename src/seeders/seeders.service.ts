// src/seeders/seeders.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { PrismaService } from 'src/Database/prisma.service';
import { hashPass } from 'src/common/config/bcrypt/hashPass';

dotenv.config();

@Injectable()
export class SeedersService {
  private readonly logger = new Logger(SeedersService.name);

  constructor(private readonly prisma: PrismaService) { }

  async onModuleInit() {
    await this.createAdmin();
  }

  async createAdmin() {
    const username = process.env.SUPERADMIN_USER;
    const password = process.env.SUPERADMIN_PASS;

    if (!username || !password) {
      this.logger.warn('⚠️ SUPERADMIN_USER yoki SUPERADMIN_PASS .env faylda yo‘q.');
      return;
    }

    const hashPassword = await hashPass(password);

    const existsUser = await this.prisma.users.findUnique({
      where: { username },
    });

    if (existsUser) {
      await this.prisma.users.update({
        where: { id: existsUser.id },
        data: {
          username,
          password: hashPassword,
        },
      });
      this.logger.log(`🔁 Super admin yangilandi`);
    } else {
      await this.prisma.users.create({
        data: {
          username,
          password: hashPassword,
          role: 'SUPER',
        },
      });
      this.logger.log(`✅ Super admin yaratildi`);
    }
  }
}
