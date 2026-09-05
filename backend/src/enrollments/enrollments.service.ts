import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../common/enums/role.enum.js';
import { CoursesService } from '../courses/courses.service.js';
import { User } from '../users/entities/user.entity.js';
import { Enrollment } from './entities/enrollment.entity.js';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentsRepository: Repository<Enrollment>,
    private readonly coursesService: CoursesService,
  ) {}

  async enroll(courseId: string, student: User) {
    if (student.role !== Role.STUDENT) {
      throw new ForbiddenException('Only students can enroll in courses');
    }

    await this.coursesService.findOne(courseId);

    const existing = await this.enrollmentsRepository.findOne({
      where: { studentId: student.id, courseId },
    });

    if (existing) {
      throw new ConflictException('Already enrolled in this course');
    }

    const enrollment = this.enrollmentsRepository.create({
      studentId: student.id,
      courseId,
    });

    return this.enrollmentsRepository.save(enrollment);
  }

  findMyEnrollments(studentId: string) {
    return this.enrollmentsRepository.find({
      where: { studentId },
      relations: ['course', 'course.instructor', 'course.lessons'],
      order: { enrolledAt: 'DESC' },
    });
  }

  async findCourseEnrollments(courseId: string, user: User) {
    const course = await this.coursesService.findOne(courseId);
    const isOwner = course.instructorId === user.id;
    const isAdmin = user.role === Role.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException(
        'You cannot view enrollments for this course',
      );
    }

    return this.enrollmentsRepository.find({
      where: { courseId },
      relations: ['student'],
      order: { enrolledAt: 'DESC' },
    });
  }

  // findMyEnrollments(studentId: string) {
  //   return this.enrollmentsRepository.find({
  //     where: { studentId },
  //     relations: ['course', 'course.instructor', 'course.lessons'],
  //     select: {
  //       course: {
  //         instructor: {
  //           id: true,
  //           email: true,
  //           name: true,
  //           role: true,
  //           createdAt: true,
  //           updatedAt: true,
  //         },
  //       },
  //     },
  //     order: { enrolledAt: 'DESC' },
  //   });
  // }

  // async findCourseEnrollments(courseId: string, user: User) {
  //   const course = await this.coursesService.findOne(courseId);
  //   const isOwner = course.instructorId === user.id;
  //   const isAdmin = user.role === Role.ADMIN;

  //   if (!isOwner && !isAdmin) {
  //     throw new ForbiddenException('You cannot view enrollments for this course');
  //   }

  //   return this.enrollmentsRepository.find({
  //     where: { courseId },
  //     relations: ['student'],
  //     select: {
  //       student: {
  //         id: true,
  //         email: true,
  //         name: true,
  //         role: true,
  //         createdAt: true,
  //         updatedAt: true,
  //       },
  //     },
  //     order: { enrolledAt: 'DESC' },
  //   });
  // }

  async unenroll(courseId: string, student: User) {
    const enrollment = await this.enrollmentsRepository.findOne({
      where: { studentId: student.id, courseId },
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    await this.enrollmentsRepository.remove(enrollment);
    return { message: 'Unenrolled successfully' };
  }
}
