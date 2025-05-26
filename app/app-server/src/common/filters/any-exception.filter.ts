import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

import { CasBaseException, ErrorCode } from '../exceptions';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  // constructor(private readonly logger: LoggerService) {}
  private readonly logger = new Logger(AllExceptionsFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const traceId = request?.headers?.['x-request-id'] || '';
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    // for CAS custom exceptions
    this.logger.error(exception.message, exception);

    if (exception instanceof CasBaseException) {
      return response.status(status).json(Object.assign(exception.getResponse(), { traceId }));
    } else if (exception instanceof HttpException) {
      // TODO: Ugly fix for casl permission guard, which throws not
      if (status === HttpStatus.FORBIDDEN && exception.message === 'Forbidden resource') {
        return response.status(status).json(Object.assign(ErrorCode.FORBIDDEN_INSUFFICIENT_PERMISSION, { traceId }));
      }
      // for other http exception throws from framework
      return response.status(status).json({
        code: status,
        message: exception.message,
        traceId,
      });
    }

    response.status(status).json(Object.assign(ErrorCode.INTERVAL_ERROR, { traceId }));
  }
}
