import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { CourseLevel } from '../../common/enums/course-level.enum.js';

export class CreateCourseDto {
  @ApiProperty({ example: 'Introduction to React' })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({ example: 'Learn React fundamentals with hands-on projects.' })
  @IsString()
  @MinLength(10)
  description: string;

  @ApiPropertyOptional({ example: 'https://picsum.photos/seed/react/600/400' })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiPropertyOptional({ example: 'Development' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ enum: CourseLevel, example: CourseLevel.BEGINNER })
  @IsOptional()
  @IsEnum(CourseLevel)
  level?: CourseLevel;
}

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
