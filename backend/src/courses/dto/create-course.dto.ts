import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: 'Introduction to React' })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({ example: 'Learn React fundamentals with hands-on projects.' })
  @IsString()
  @MinLength(10)
  description: string;
}

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
