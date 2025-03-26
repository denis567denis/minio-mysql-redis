import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { Readable } from 'stream';

@Injectable()
export class StorageService {
  private minioClient: Minio.Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get<string>('minio.endPoint') || 'localhost',
      port: this.configService.get<number>('minio.port') || 9000,
      useSSL: false,
      accessKey:
        this.configService.get<string>('minio.accessKey') || 'minioadmin',
      secretKey:
        this.configService.get<string>('minio.secretKey') || 'minioadmin',
    });

    this.bucketName =
      this.configService.get<string>('minio.bucketName') || 'items';
    this.createBucketIfNotExists();
  }

  private async createBucketIfNotExists() {
    const bucketExists = await this.minioClient.bucketExists(this.bucketName);
    if (!bucketExists) {
      await this.minioClient.makeBucket(this.bucketName);
    }
  }

  async uploadFile(
    fileName: string,
    fileStream: Buffer | Readable,
    size: number,
  ): Promise<string> {
    await this.minioClient.putObject(
      this.bucketName,
      fileName,
      fileStream,
      size,
    );
    return fileName;
  }

  async getFileUrl(fileName: string): Promise<string> {
    return await this.minioClient.presignedUrl(
      'GET',
      this.bucketName,
      fileName,
    );
  }

  async deleteFile(fileName: string): Promise<void> {
    await this.minioClient.removeObject(this.bucketName, fileName);
  }
}
