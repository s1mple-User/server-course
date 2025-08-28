import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Instructor, InstructorSchema } from 'src/instructor/instructor.model';
import { Review, ReviewSchema } from 'src/review/review.model';
import { User, UserSchema } from 'src/user/user.model';
import { CourseController } from './course.controller';
import { Course, CourseSchema } from './course.model';
import { CourseService } from './course.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Course.name, schema: CourseSchema },
      { name: Instructor.name, schema: InstructorSchema },
      { name: Review.name, schema: ReviewSchema },
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}