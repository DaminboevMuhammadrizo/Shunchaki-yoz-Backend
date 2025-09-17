import { Module } from '@nestjs/common';
import { PrismaModule } from './Database/prisma.module';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [PostsModule, PrismaModule],
})
export class AppModule { }
