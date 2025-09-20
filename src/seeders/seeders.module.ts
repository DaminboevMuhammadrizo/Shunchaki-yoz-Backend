import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/Database/prisma.module';
import { SeedersService } from './seeders.service';

@Module({
  imports: [PrismaModule],
  providers: [SeedersService]
})
export class SeedersModule { }
