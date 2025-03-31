import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    console.log(10, createUserDto.password);
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userDto } = createUserDto;
    console.log(userDto);
    console.log(hashedPassword);
    const user = this.usersRepository.create({
      ...userDto,
      password: hashedPassword,
    });

    console.log(user);

    const savedUser = await this.usersRepository.save(user);
    return savedUser;
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.usersRepository.save({
      ...user,
      ...updateUserDto,
    });

    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role'],
    });
  }
}
