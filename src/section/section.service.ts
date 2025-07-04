import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course } from 'src/course/course.model';
import { SectionDto } from './section.dto';
import { Section } from './section.model';

@Injectable()
export class SectionService {
  constructor(
    @InjectModel(Section.name) private sectionModel: Model<Section>,
    @InjectModel(Course.name) private courseModel: Model<Course>,
  ) {}

  async createSection({ title }: SectionDto, courseId: string) {
    if (!courseId || !Types.ObjectId.isValid(courseId)) {
      throw new BadRequestException('Invalid or missing courseId');
    }

    const section = await this.sectionModel.create({ title });

    const course = await this.courseModel
      .findByIdAndUpdate(
        courseId,
        {
          $push: { sections: section._id },
        },
        { new: true },
      )
      .populate({ path: 'sections', populate: { path: 'lessons' } });

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    return course.sections;
  }

  async deleteSection(sectionId: string, courseId: string) {
    if (!courseId || !Types.ObjectId.isValid(courseId)) {
      throw new BadRequestException('Invalid or missing courseId');
    }

    if (!sectionId || !Types.ObjectId.isValid(sectionId)) {
      throw new BadRequestException('Invalid or missing sectionId');
    }

    await this.sectionModel.findByIdAndRemove(sectionId);

    const course = await this.courseModel
      .findByIdAndUpdate(
        courseId,
        {
          $pull: { sections: sectionId },
        },
        { new: true },
      )
      .populate({ path: 'sections', populate: { path: 'lessons' } });

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    return course.sections;
  }

  async editSection(sectionId: string, { title, lessons }: SectionDto) {
    if (!sectionId || !Types.ObjectId.isValid(sectionId)) {
      throw new BadRequestException('Invalid or missing sectionId');
    }

    const updated = await this.sectionModel
      .findByIdAndUpdate(
        sectionId,
        { $set: { title, lessons } },
        { new: true },
      )
      .populate('lessons');

    if (!updated) {
      throw new BadRequestException('Section not found');
    }

    return updated;
  }

  async getSection(courseId: string) {
    if (!courseId || !Types.ObjectId.isValid(courseId)) {
      throw new BadRequestException('Invalid or missing courseId');
    }

    const course = await this.courseModel
      .findById(courseId)
      .populate({ path: 'sections', populate: { path: 'lessons' } });

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    return course.sections;
  }
}
