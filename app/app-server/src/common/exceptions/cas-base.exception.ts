import { HttpException, HttpStatus } from '@nestjs/common';

import { ErrorCode } from './error';

export class CasBaseException extends HttpException {
  constructor(error: ErrorCode, statusCode: HttpStatus) {
    super(error, statusCode);
  }
}
