import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

// Note: role is intentionally NOT accepted here. Public registration always
// creates a student account. Promoting someone to instructor/admin is an
// admin-only action (see UsersController.updateRole).
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
}
