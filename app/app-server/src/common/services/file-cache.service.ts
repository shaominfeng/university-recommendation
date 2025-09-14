import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileCacheService implements OnModuleInit {
  private fileCache: Map<string, Buffer> = new Map();
  private readonly baseDir = path.join(process.cwd(), 'src/file');

  async onModuleInit() {
    await this.loadAllFiles(this.baseDir);
    // 打印所有已缓存的文件key
    // eslint-disable-next-line no-console
    console.log('[FileCacheService] 缓存的文件key:', Array.from(this.fileCache.keys()));
  }

  private async loadAllFiles(dir: string, prefix = ''): Promise<void> {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const relPath = path.join(prefix, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        await this.loadAllFiles(fullPath, relPath);
      } else {
        const data = fs.readFileSync(fullPath);
        this.fileCache.set(relPath, data);
      }
    }
  }

  getFileBuffer(relPath: string): Buffer | undefined {
    // 兼容各种路径格式：去除前缀 / 或 \\，统一分隔符为 /
    let key = relPath.replace(/^[/\\]+/, '').replace(/\\/g, '/');
    const hasKey = this.fileCache.has(key);
    // eslint-disable-next-line no-console
    console.log('[FileCacheService] getFileBuffer 查询key:', key, '命中:', hasKey);
    return this.fileCache.get(key);
  }

  getFileList(): string[] {
    return Array.from(this.fileCache.keys());
  }
}
