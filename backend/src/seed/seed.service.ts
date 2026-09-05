import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CourseLevel } from '../common/enums/course-level.enum.js';
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
  ) { }

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

    const jane = await this.usersRepository.save({
      email: 'instructor@lms.test',
      name: 'Jane Instructor',
      password,
      role: Role.INSTRUCTOR,
    });

    const marcus = await this.usersRepository.save({
      email: 'marcus@lms.test',
      name: 'Marcus Lee',
      password,
      role: Role.INSTRUCTOR,
    });

    const aisha = await this.usersRepository.save({
      email: 'aisha@lms.test',
      name: 'Aisha Patel',
      password,
      role: Role.INSTRUCTOR,
    });

    await this.usersRepository.save({
      email: 'student@lms.test',
      name: 'Sam Student',
      password,
      role: Role.STUDENT,
    });

    const courseCatalog = [
      {
        title: 'Introduction to React',
        description:
          'Learn React fundamentals: components, props, state, and hooks, building toward a real project.',
        category: 'Development',
        level: CourseLevel.BEGINNER,
        imageUrl: 'https://picsum.photos/seed/react-intro/600/400',
        instructorId: jane.id,
        lessons: [
          { title: 'What is React?', content: 'React is a library for building user interfaces out of small, reusable components.', durationMinutes: 10 },
          { title: 'Your first component', content: 'Create a simple function component and render it to the DOM with createRoot.', durationMinutes: 15 },
          { title: 'Props and composition', content: 'Pass data into components with props, and compose small components into larger ones.', durationMinutes: 18 },
          { title: 'State with useState', content: 'Add interactivity to a component using the useState hook.', durationMinutes: 20 },
        ],
      },
      {
        title: 'React Router Basics',
        description:
          'Build multi-page single page applications with React Router: routes, layouts, and navigation.',
        category: 'Development',
        level: CourseLevel.INTERMEDIATE,
        imageUrl: 'https://picsum.photos/seed/react-router/600/400',
        instructorId: jane.id,
        lessons: [
          { title: 'Setting up routes', content: 'Install react-router-dom and define your first route map with createBrowserRouter.', durationMinutes: 14 },
          { title: 'Nested routes and layouts', content: 'Use layout routes and an Outlet to share navigation across pages.', durationMinutes: 16 },
          { title: 'Dynamic route params', content: 'Read URL parameters with useParams to build pages like /courses/:id.', durationMinutes: 12 },
        ],
      },
      {
        title: 'Node.js Backend Development',
        description:
          'Design and build REST APIs with Node.js and Express, covering routing, middleware, and databases.',
        category: 'Development',
        level: CourseLevel.INTERMEDIATE,
        imageUrl: 'https://picsum.photos/seed/nodejs-backend/600/400',
        instructorId: jane.id,
        lessons: [
          { title: 'Setting up Express', content: 'Scaffold an Express server and define your first route handler.', durationMinutes: 12 },
          { title: 'Middleware and routing', content: 'Understand the Express middleware chain and organize routes with Router.', durationMinutes: 18 },
          { title: 'Connecting a database', content: 'Wire up a database connection and perform basic CRUD queries.', durationMinutes: 25 },
          { title: 'Authentication with JWT', content: 'Issue and verify JSON Web Tokens to protect private routes.', durationMinutes: 22 },
        ],
      },
      {
        title: 'UI/UX Design Masterclass',
        description:
          'Learn the principles of user-centered design, from wireframes to high-fidelity, accessible interfaces.',
        category: 'Design',
        level: CourseLevel.INTERMEDIATE,
        imageUrl: 'https://picsum.photos/seed/uiux-design/600/400',
        instructorId: marcus.id,
        lessons: [
          { title: 'Design thinking basics', content: 'Understand the empathize-define-ideate-prototype-test process.', durationMinutes: 15 },
          { title: 'Color theory', content: 'Build accessible, harmonious color palettes for digital products.', durationMinutes: 20 },
          { title: 'Typography fundamentals', content: 'Choose and pair typefaces for readability and hierarchy.', durationMinutes: 16 },
          { title: 'Wireframing in Figma', content: 'Turn a rough idea into a low-fidelity wireframe.', durationMinutes: 24 },
        ],
      },
      {
        title: 'Business Strategy Essentials',
        description:
          'A practical introduction to competitive strategy, business models, and market positioning.',
        category: 'Business',
        level: CourseLevel.BEGINNER,
        imageUrl: 'https://picsum.photos/seed/business-strategy/600/400',
        instructorId: marcus.id,
        lessons: [
          { title: 'What is a business model?', content: 'Map out how a company creates, delivers, and captures value.', durationMinutes: 12 },
          { title: 'Competitive positioning', content: 'Identify what makes an offer genuinely differentiated.', durationMinutes: 14 },
          { title: 'Reading a market', content: 'Use simple frameworks to size and evaluate a target market.', durationMinutes: 18 },
        ],
      },
      {
        title: 'Data Science with Python',
        description:
          'Get hands-on with data analysis and visualization in Python using pandas and matplotlib.',
        category: 'Data',
        level: CourseLevel.ADVANCED,
        imageUrl: 'https://picsum.photos/seed/data-science/600/400',
        instructorId: aisha.id,
        lessons: [
          { title: 'Pandas basics', content: 'Load, inspect, and filter tabular data with pandas DataFrames.', durationMinutes: 20 },
          { title: 'Cleaning messy data', content: 'Handle missing values, duplicates, and inconsistent types.', durationMinutes: 25 },
          { title: 'Visualizing with matplotlib', content: 'Turn a DataFrame into clear, labeled charts.', durationMinutes: 18 },
          { title: 'A first regression model', content: 'Fit and interpret a simple linear regression.', durationMinutes: 30 },
        ],
      },
    ];

    for (const { lessons, ...courseData } of courseCatalog) {
      const course = await this.coursesRepository.save(courseData);
      await this.lessonsRepository.save(
        lessons.map((lesson, index) => ({
          ...lesson,
          order: index + 1,
          courseId: course.id,
        })),
      );
    }

    this.logger.log('Demo users created (password for all: password123)');
    this.logger.log(`  admin: ${admin.email}`);
    this.logger.log(`  instructor: ${jane.email} / ${marcus.email} / ${aisha.email}`);
    this.logger.log('  student: student@lms.test');
  }
}
