import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { getMongoDBConfig } from './config/mongo.config';
import { CourseModule } from './course/course.module';
import { UserModule } from './user/user.module';
import { InstructorModule } from './instructor/instructor.module';
import { FileModule } from './file/file.module';
import { SectionModule } from './section/section.module';
import { LessonModule } from './lesson/lesson.module';
import { AdminModule } from './admin/admin.module';
import { BooksModule } from './books/books.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoDBConfig,
    }),
    AuthModule,
    CourseModule,
    UserModule,
    InstructorModule,
    FileModule,
    SectionModule,
    LessonModule,
    AdminModule,
    BooksModule,
    ReviewModule,
  ],
})
export class AppModule {}
