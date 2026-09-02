import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Role } from '../common/enums/role.enum.js';
import { Course } from '../courses/entities/course.entity.js';
import { Lesson } from '../lessons/entities/lesson.entity.js';
import { User } from '../users/entities/user.entity.js';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
  ) {}

  async onModuleInit() {
    const userCount = await this.usersRepository.count();
    if (userCount > 0) {
      return;
    }

    this.logger.log('Seeding demo data...');

    const password = await bcrypt.hash('password123', 10);

    const admin = await this.usersRepository.save({
      email: 'admin@lms.test',
      name: 'Admin User',
      password,
      role: Role.ADMIN,
    });

    const instructor = await this.usersRepository.save({
      email: 'instructor@lms.test',
      name: 'Jane Instructor',
      password,
      role: Role.INSTRUCTOR,
    });

    await this.usersRepository.save({
      email: 'student@lms.test',
      name: 'Sam Student',
      password,
      role: Role.STUDENT,
    });

    const reactCourse = await this.coursesRepository.save({
      title: 'Introduction to React',
      description:
        'Learn React fundamentals: components, props, state, and hooks.',
      instructorId: instructor.id,
    });

    const routerCourse = await this.coursesRepository.save({
      title: 'React Router Basics',
      description:
        'Build multi-page apps with React Router: routes, layouts, and navigation.',
      instructorId: instructor.id,
    });

    await this.lessonsRepository.save([
      {
        title: 'What is React?',
        content: 'React is a library for building user interfaces with components.',
        order: 1,
        courseId: reactCourse.id,
      },
      {
        title: 'Your first component',
        content: 'Create a simple function component and render it to the DOM.',
        order: 2,
        courseId: reactCourse.id,
      },
      {
        title: 'Setting up routes',
        content: 'Install react-router-dom and define your first route map.',
        order: 1,
        courseId: routerCourse.id,
      },
      {
        title: 'Nested routes and layouts',
        content: 'Use layout routes to share navigation across pages.',
        order: 2,
        courseId: routerCourse.id,
      },
    ]);

    this.logger.log('Demo users created (password for all: password123)');
    this.logger.log(`  admin: ${admin.email}`);
    this.logger.log(`  instructor: ${instructor.email}`);
    this.logger.log('  student: student@lms.test');
  }
}
