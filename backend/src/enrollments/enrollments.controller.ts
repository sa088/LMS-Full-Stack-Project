import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Role } from '../common/enums/role.enum.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { User } from '../users/entities/user.entity.js';
import { EnrollmentsService } from './enrollments.service.js';

@ApiTags('enrollments')
@Controller()
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post('courses/:courseId/enroll')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.STUDENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Enroll in a course (student)' })
  enroll(@Param('courseId') courseId: string, @CurrentUser() user: User) {
    return this.enrollmentsService.enroll(courseId, user);
  }

  @Delete('courses/:courseId/enroll')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.STUDENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unenroll from a course (student)' })
  unenroll(@Param('courseId') courseId: string, @CurrentUser() user: User) {
    return this.enrollmentsService.unenroll(courseId, user);
  }

  @Get('me/enrollments')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List courses the current user is enrolled in' })
  myEnrollments(@CurrentUser() user: User) {
    return this.enrollmentsService.findMyEnrollments(user.id);
  }

  @Get('courses/:courseId/enrollments')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List students enrolled in a course (owner/admin)' })
  courseEnrollments(
    @Param('courseId') courseId: string,
    @CurrentUser() user: User,
  ) {
    return this.enrollmentsService.findCourseEnrollments(courseId, user);
  }
}
