import { HttpStatus } from '@nestjs/common';

import { CasBaseException } from './cas-base.exception';
import { ErrorCode } from './error';

// only use for framework

export class BadRequestException extends CasBaseException {
  constructor(errorCode: ErrorCode, errorMsg?: string) {
    let error = {};
    if (errorMsg) {
      error = { ...errorCode, error: `${errorMsg}` };
    } else {
      error = { ...errorCode };
    }
    super(error, HttpStatus.BAD_REQUEST);
  }
}

export class ForbiddenException extends CasBaseException {
  constructor(error: ErrorCode) {
    super(error, HttpStatus.FORBIDDEN);
  }
}

export class UnsupportedMediaType extends CasBaseException {
  constructor(error: ErrorCode) {
    super(error, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
  }
}

export class ThrottlingException extends CasBaseException {
  constructor(error: ErrorCode) {
    super(error, HttpStatus.TOO_MANY_REQUESTS);
  }
}

export class UnauthorizedException extends CasBaseException {
  constructor(error: ErrorCode) {
    super(error, HttpStatus.UNAUTHORIZED);
  }
}

export class InternalServerErrorException extends CasBaseException {
  constructor(error: ErrorCode) {
    super(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class ServiceUnavailableException extends CasBaseException {
  constructor(error: ErrorCode) {
    super(error, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
