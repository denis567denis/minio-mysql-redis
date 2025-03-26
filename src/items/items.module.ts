import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { StorageModule } from '../storage/storage.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    StorageModule,
    CacheModule.register(),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
