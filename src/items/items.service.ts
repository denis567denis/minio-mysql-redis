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

  async create(createItemDto: CreateItemDto, files: Express.Multer.File[]) {
    const imageKeys = await Promise.all(
      files.map(async (file) => {
        const key = await this.storageService.uploadFile(
          `${Date.now()}-${file.originalname}`,
          file.buffer,
          file.size,
        );
        return key;
      }),
    );

    const newItem = this.itemsRepository.create({
      ...createItemDto,
      imageKeys,
    });

    const savedItem = await this.itemsRepository.save(newItem);
    const imageUrls = await Promise.all(
      imageKeys.map((key) => this.storageService.getFileUrl(key)),
    );

    await this.cacheManager.del('all_items');

    return {
      ...savedItem,
      imageUrls,
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
        const imageUrls = await Promise.all(
          item.imageKeys.map((key) => this.storageService.getFileUrl(key)),
        );
        return {
          ...item,
          imageUrls,
        };
      }),
    );

    await this.cacheManager.set(cacheKey, itemsWithUrls);

    return itemsWithUrls;
  }

  async update(
    id: number,
    updateItemDto: UpdateItemDto,
    files?: Express.Multer.File[],
  ) {
    const item = await this.itemsRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    let imageKeys = item.imageKeys;
    if (files && files.length > 0) {
      const newKeysImage = await Promise.all(
        files.map(async (file) => {
          const imageKey = await this.storageService.uploadFile(
            file.originalname,
            file.buffer,
            file.size,
          );
          return imageKey;
        }),
      );

      await Promise.all(
        newKeysImage.map(async (key) => {
          await this.storageService.deleteFile(key);
        }),
      );

      imageKeys = newKeysImage;
    }
    const updatedItem = await this.itemsRepository.save({
      ...item,
      ...updateItemDto,
      imageKeys,
    });

    const imageUrls = await Promise.all(
      updatedItem.imageKeys.map((key) => this.storageService.getFileUrl(key)),
    );
    await this.cacheManager.del('all_items');
    return {
      ...updatedItem,
      imageUrls,
    };
  }

  async remove(id: number) {
    const item = await this.itemsRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    await Promise.all(
      item.imageKeys.map(async (key) => {
        await this.storageService.deleteFile(key);
      }),
    );
    await this.itemsRepository.remove(item);
    await this.cacheManager.del('all_items');
    return {
      status: 'ok',
    };
  }
}
