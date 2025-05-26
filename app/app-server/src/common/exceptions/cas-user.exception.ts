import { HttpStatus } from '@nestjs/common';

import { CasBaseException } from './cas-base.exception';
import { ErrorCode } from './error';

export class NotFoundException extends CasBaseException {
  constructor(error: ErrorCode) {
    super(error, HttpStatus.NOT_FOUND);
  }
}

export class ApiException extends CasBaseException {
  constructor(error: ErrorCode) {
    super(error, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
