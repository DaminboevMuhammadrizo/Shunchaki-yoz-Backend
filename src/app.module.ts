import { Module } from '@nestjs/common';
import { PrismaModule } from './Database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ComplaintModule } from './modules/complaint/complaint.module';
import { LikesModule } from './modules/likes/likes.module';
import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';
import { SeedersModule } from './seeders/seeders.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    LikesModule,
    ComplaintModule,
    PrismaModule,
    SeedersModule,
  ],
})
export class AppModule { }
