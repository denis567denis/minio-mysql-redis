import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { StorageService } from '../storage/storage.service';
import { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    private storageService: StorageService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createItemDto: CreateItemDto, file: Express.Multer.File) {
    const imageKey = await this.storageService.uploadFile(
      file.originalname,
      file.buffer,
      file.size,
    );

    const newItem = this.itemsRepository.create({
      ...createItemDto,
      imageKey,
    });

    const savedItem = await this.itemsRepository.save(newItem);
    const imageUrl = await this.storageService.getFileUrl(savedItem.imageKey);

    await this.cacheManager.del('all_items');

    return {
      ...savedItem,
      imageUrl,
    };
  }

  async findAll(id?: string) {
    const cacheKey = `all_items${id ? `_${id}` : ''}`;
    const cachedItems = await this.cacheManager.get(cacheKey);

    if (cachedItems) {
      return cachedItems;
    }

    const queryBuilder = this.itemsRepository.createQueryBuilder('item');

    if (id) {
      queryBuilder.where('item.id = :id', { id });
    }

    const items = await queryBuilder.getMany();

    const itemsWithUrls = await Promise.all(
      items.map(async (item) => {
        const imageUrl = await this.storageService.getFileUrl(item.imageKey);
        return {
          ...item,
          imageUrl,
        };
      }),
    );

    await this.cacheManager.set(cacheKey, itemsWithUrls);

    return itemsWithUrls;
  }

  async update(
    id: number,
    updateItemDto: UpdateItemDto,
    file?: Express.Multer.File,
  ) {
    const item = await this.itemsRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    let imageKey = item.imageKey;
    if (file) {
      await this.storageService.deleteFile(item.imageKey);
      imageKey = await this.storageService.uploadFile(
        file.originalname,
        file.buffer,
        file.size,
      );
    }

    const updatedItem = await this.itemsRepository.save({
      ...item,
      ...updateItemDto,
      imageKey,
    });

    const imageUrl = await this.storageService.getFileUrl(updatedItem.imageKey);

    await this.cacheManager.del('all_items');
    return {
      ...updatedItem,
      imageUrl,
    };
  }

  async remove(id: number) {
    const item = await this.itemsRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    await this.storageService.deleteFile(item.imageKey);
    await this.itemsRepository.remove(item);
    await this.cacheManager.del('all_items');
    return {
      status: 'ok',
    };
  }
}
