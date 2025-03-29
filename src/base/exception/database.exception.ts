import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * @description 通用的持久化层异常
 */
class DataBaseException extends HttpException {
  constructor(message: string) {
    super(
      `[ DataBaseException ]: ${message}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export { DataBaseException };
