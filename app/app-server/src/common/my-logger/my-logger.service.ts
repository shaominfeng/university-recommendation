import { Logger, PinoLogger, Params, PARAMS_PROVIDER_TOKEN } from 'nestjs-pino';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MyLoggerService extends Logger {
  constructor(logger: PinoLogger, @Inject(PARAMS_PROVIDER_TOKEN) params: Params) {
    super(logger, params);
  }
}
