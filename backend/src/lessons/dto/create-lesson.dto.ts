import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ example: 'Setting up your environment' })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({ example: 'Install Node.js and create a new Vite project...' })
  @IsString()
  @MinLength(10)
  content: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @ApiPropertyOptional({
    example: 12,
    description: 'Estimated minutes to complete this lesson',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  durationMinutes?: number;
}

export class UpdateLessonDto extends PartialType(CreateLessonDto) {}
