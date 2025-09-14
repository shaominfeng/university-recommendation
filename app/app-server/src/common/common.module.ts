import { Module } from '@nestjs/common';
import { FileCacheService } from './services/file-cache.service';

@Module({
  providers: [FileCacheService],
  exports: [FileCacheService],
})
export class CommonModule {}

