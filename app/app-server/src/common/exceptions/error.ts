class CodeAndMessage {
  code!: number;
  message!: string;
  error?: string;
}

export class ErrorCode {
  /**
   * HTTP STATUS: 400 Bad Request
   */
  static readonly BAD_REQUEST_INVALID_PARAMS: CodeAndMessage = {
    code: 400001,
    message: `Invalid params`,
  };

  static readonly BAD_REQUEST_INVALID_CAS_HEADER: CodeAndMessage = {
    code: 400002,
    message: 'Invalid cas header',
  };

  static readonly BAD_REQUEST_OUT_OF_LIMIT: CodeAndMessage = {
    code: 400003,
    message: `Out of limit`,
  };

  static readonly BAD_REQUEST_INVALID_QUERY_PARAMS: CodeAndMessage = {
    code: 400004,
    message: `Invalid query parameters`,
  };

  /**
   * HTTP STATUS: 415 Unsupported Media Type
   */
  static readonly UNSUPPORTED_MEDIA_TYPE: CodeAndMessage = {
    code: 415001,
    message: 'Invalid content type',
  };

  /**
   * HTTP STATUS: 401 Unauthorized
   */
  static readonly UNAUTHORIZED: CodeAndMessage = {
    code: 401001,
    message: 'Please Sign in',
  };

  /**
   * HTTP STATUS: 403 Forbidden
   */
  static readonly FORBIDDEN_INVALID_TOKEN: CodeAndMessage = {
    code: 403001,
    message: 'Invalid token',
  };
  static readonly FORBIDDEN_INSUFFICIENT_PERMISSION: CodeAndMessage = {
    code: 403002,
    message: 'No Permission',
  };

  static readonly FORBIDDEN_INVALID_ORG: CodeAndMessage = {
    code: 403003,
    message: 'Invalid org',
  };

  /**
   * HTTP STATUS: 404 Not Found
   */
  static readonly NOT_FOUND_USER: CodeAndMessage = {
    code: 404001,
    message: 'User not found',
  };
  static readonly NOT_FOUND_SESSION: CodeAndMessage = {
    code: 404002,
    message: 'Session not found',
  };
  static readonly NOT_FOUND_EMAIL: CodeAndMessage = {
    code: 404003,
    message: 'Email not found',
  };
  static readonly NOT_FOUND_RESOURCE: CodeAndMessage = {
    code: 404004,
    message: 'Resource not found',
  };

  /**
   * HTTP STATUS: 429 Too Many Requests
   */
  static readonly RATE_LIMIT_EXCEEDED: CodeAndMessage = {
    code: 429001,
    message: 'Rate limit exceeded',
  };

  /**
   * HTTP STATUS: 500 Internal Servier Error
   */
  static readonly INTERVAL_ERROR: CodeAndMessage = {
    code: 500001,
    message: 'Internal server error',
  };

  /**
   * HTTP STATUS: 503 Service Unavailable
   */
  static readonly SERVICE_UNAVAILABLE: CodeAndMessage = {
    code: 503001,
    message: 'Service unavailable',
  };

  static CodeToMessage(code: number): string {
    for (const key of Object.keys(this)) {
      if ((this[key as keyof typeof ErrorCode] as CodeAndMessage).code === code) {
        return (this[key as keyof typeof ErrorCode] as CodeAndMessage).message;
      }
    }
    return '';
  }

  static HasCode(code: number): boolean {
    for (const key of Object.keys(this)) {
      if ((this[key as keyof typeof ErrorCode] as CodeAndMessage).code === code) {
        return true;
      }
    }
    return false;
  }

  // only for swagger doc use
  static getServerErrors() {
    const serverErrors = [];
    for (const key of Object.keys(this)) {
      const statusCode = (this[key as keyof typeof ErrorCode] as CodeAndMessage).code.toString().substring(0, 3);
      if (['400', '401', '402', '403', '429', '500', '503'].includes(statusCode)) {
        serverErrors.push({
          statusCode,
          indexKey: key,
        });
      }
    }
    return serverErrors;
  }
}
