import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  Query,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @Roles(UserRole.AMMINISTRATORE, UserRole.COMMERCIALE, UserRole.DIRETTORE)
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body() createItemDto: CreateItemDto,
    @UploadedFiles() file: Express.Multer.File[],
  ) {
    return this.itemsService.create(createItemDto, file);
  }

  @Roles(UserRole.OPERATORE)
  @Get()
  async findAll(@Query('id') id?: string) {
    return this.itemsService.findAll(id);
  }

  @Roles(UserRole.AMMINISTRATORE, UserRole.COMMERCIALE, UserRole.DIRETTORE)
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images'))
  async update(
    @Param('id') id: number,
    @Body() updateItemDto: UpdateItemDto,
    @UploadedFiles() file?: Express.Multer.File[],
  ) {
    return this.itemsService.update(id, updateItemDto, file);
  }

  @Roles(UserRole.AMMINISTRATORE, UserRole.COMMERCIALE, UserRole.DIRETTORE)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.itemsService.remove(id);
  }
}
