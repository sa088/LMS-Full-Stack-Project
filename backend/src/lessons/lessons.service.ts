import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../common/enums/role.enum.js';
import { CoursesService } from '../courses/courses.service.js';
import { User } from '../users/entities/user.entity.js';
import { CreateLessonDto, UpdateLessonDto } from './dto/create-lesson.dto.js';
import { Lesson } from './entities/lesson.entity.js';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
    private readonly coursesService: CoursesService,
  ) {}

  async findByCourse(courseId: string) {
    await this.coursesService.findOne(courseId);
    return this.lessonsRepository.find({
      where: { courseId },
      order: { order: 'ASC' },
    });
  }

  async create(courseId: string, dto: CreateLessonDto, user: User) {
    const course = await this.coursesService.findOne(courseId);
    this.assertCanManageLessons(course.instructorId, user);

    const lesson = this.lessonsRepository.create({
      ...dto,
      courseId,
      order: dto.order ?? 0,
    });

    return this.lessonsRepository.save(lesson);
  }

  async update(id: string, dto: UpdateLessonDto, user: User) {
    const lesson = await this.findOne(id);
    const course = await this.coursesService.findOne(lesson.courseId);
    this.assertCanManageLessons(course.instructorId, user);

    Object.assign(lesson, dto);
    return this.lessonsRepository.save(lesson);
  }

  async remove(id: string, user: User) {
    const lesson = await this.findOne(id);
    const course = await this.coursesService.findOne(lesson.courseId);
    this.assertCanManageLessons(course.instructorId, user);

    await this.lessonsRepository.remove(lesson);
    return { message: 'Lesson deleted' };
  }

  private async findOne(id: string) {
    const lesson = await this.lessonsRepository.findOne({ where: { id } });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    return lesson;
  }

  private assertCanManageLessons(instructorId: string, user: User) {
    const isOwner = instructorId === user.id;
    const isAdmin = user.role === Role.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('You cannot manage lessons for this course');
    }
  }
}
