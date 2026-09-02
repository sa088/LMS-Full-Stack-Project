import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../../common/enums/role.enum.js';

export class RegisterDto {
  @ApiProperty({ example: 'alex@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Alex Johnson' })
  @IsString()
  name: string;

  @ApiProperty({
    enum: Role,
    example: Role.STUDENT,
    required: false,
    description: 'Defaults to student. Only admins can assign instructor/admin roles.',
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
