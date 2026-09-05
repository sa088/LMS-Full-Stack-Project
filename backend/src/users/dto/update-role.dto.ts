import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Role } from '../../common/enums/role.enum.js';

export class UpdateRoleDto {
  @ApiProperty({ enum: Role, example: Role.INSTRUCTOR })
  @IsEnum(Role)
  role: Role;
}
