import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../courses/entities/course.entity.js';
import { Lesson } from '../lessons/entities/lesson.entity.js';
import { User } from '../users/entities/user.entity.js';
import { SeedService } from './seed.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([User, Course, Lesson])],
  providers: [SeedService],
})
export class SeedModule {}
