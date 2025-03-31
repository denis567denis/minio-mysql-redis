import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from './entities/user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(UserRole.AMMINISTRATORE)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  @Roles(UserRole.AMMINISTRATORE)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get()
  @Roles(UserRole.AMMINISTRATORE)
  findAll() {
    return this.usersService.findAll();
  }

  @Put(':id')
  @Roles(UserRole.AMMINISTRATORE)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(UserRole.AMMINISTRATORE)
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}
