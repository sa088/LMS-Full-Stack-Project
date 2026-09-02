import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../common/enums/role.enum.js';
import { User } from '../users/entities/user.entity.js';
import { CreateCourseDto, UpdateCourseDto } from './dto/create-course.dto.js';
import { Course } from './entities/course.entity.js';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {}

  findAll() {
    return this.coursesRepository.find({
      relations: ['instructor', 'lessons'],
      select: {
        instructor: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      order: { createdAt: 'DESC', lessons: { order: 'ASC' } },
    });
  }

  async findOne(id: string) {
    const course = await this.coursesRepository.findOne({
      where: { id },
      relations: ['instructor', 'lessons'],
      select: {
        instructor: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      order: { lessons: { order: 'ASC' } },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  create(dto: CreateCourseDto, instructor: User) {
    const course = this.coursesRepository.create({
      ...dto,
      instructorId: instructor.id,
    });

    return this.coursesRepository.save(course);
  }

  async update(id: string, dto: UpdateCourseDto, user: User) {
    const course = await this.findOne(id);
    this.assertCanManageCourse(course, user);
    Object.assign(course, dto);
    return this.coursesRepository.save(course);
  }

  async remove(id: string, user: User) {
    const course = await this.findOne(id);
    this.assertCanManageCourse(course, user);
    await this.coursesRepository.remove(course);
    return { message: 'Course deleted' };
  }

  assertCanManageCourse(course: Course, user: User) {
    const isOwner = course.instructorId === user.id;
    const isAdmin = user.role === Role.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('You cannot manage this course');
    }
  }
}
