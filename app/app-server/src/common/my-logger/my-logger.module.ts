import { Module } from '@nestjs/common';
import { MyLoggerService } from './my-logger.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import pino from 'pino';
@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          pinoHttp: {
            level: config.get('log.level'),
            stream: pino.destination({
              dest: './my-logger', // omit for stdout
              minLength: 4096, // Buffer before writing
              sync: false, // Asynchronous logging
            }),
            timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
          },
        };
      },
    }),
  ],
  providers: [MyLoggerService],
  exports: [MyLoggerService],
})
export class MyLoggerModule {}
