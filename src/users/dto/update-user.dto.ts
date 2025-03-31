import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsString()
  @IsOptional()
  password: string;
}
