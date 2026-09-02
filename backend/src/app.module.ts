import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module.js';
import { Course } from './courses/entities/course.entity.js';
import { CoursesModule } from './courses/courses.module.js';
import { Enrollment } from './enrollments/entities/enrollment.entity.js';
import { EnrollmentsModule } from './enrollments/enrollments.module.js';
import { Lesson } from './lessons/entities/lesson.entity.js';
import { LessonsModule } from './lessons/lessons.module.js';
import { SeedModule } from './seed/seed.module.js';
import { User } from './users/entities/user.entity.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.DATABASE_PATH ?? 'lms.sqlite',
      entities: [User, Course, Lesson, Enrollment],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CoursesModule,
    LessonsModule,
    EnrollmentsModule,
    SeedModule,
  ],
})
export class AppModule {}
