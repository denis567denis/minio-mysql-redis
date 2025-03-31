import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ItemsModule } from './items/items.module';
import { StorageModule } from './storage/storage.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import configuration from './config/configuration';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UserRole } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('config.database.host'),
          port: configService.get('config.database.port'),
          username: configService.get('config.database.username'),
          password: configService.get('config.database.password'),
          database: configService.get('config.database.database'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('config.redis.host'),
        port: configService.get<number>('config.redis.port'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    ItemsModule,
    StorageModule,
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    await this.createAdminIfNotExists();
  }

  private async createAdminIfNotExists() {
    const adminEmail = 'user@mail.com';
    const adminPassword = 'root';

    if (!adminEmail || !adminPassword) return;

    const existingAdmin = await this.usersService.findOneByEmail(adminEmail);
    if (!existingAdmin) {
      await this.usersService.create({
        email: adminEmail,
        password: adminPassword,
        role: UserRole.AMMINISTRATORE,
      });
      console.log('Admin user created');
    }
  }
}
