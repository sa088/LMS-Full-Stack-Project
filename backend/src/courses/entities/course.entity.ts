import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CourseLevel } from '../../common/enums/course-level.enum.js';
import type { User } from '../../users/entities/user.entity.js';
import type { Lesson } from '../../lessons/entities/lesson.entity.js';
import type { Enrollment } from '../../enrollments/entities/enrollment.entity.js';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  category?: string;

  @Column({ type: 'text', nullable: true })
  level?: CourseLevel;

  @Column()
  instructorId: string;

  @ManyToOne('User', 'courses', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'instructorId' })
  instructor: User;

  @OneToMany('Lesson', 'course')
  lessons: Lesson[];

  @OneToMany('Enrollment', 'course')
  enrollments: Enrollment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
