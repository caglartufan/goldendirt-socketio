import ERROR_MESSAGES from '../messages/error';

class UnauthorizedError extends Error {
  constructor() {
    super(ERROR_MESSAGES.UNAUTHORIZED);
    this.name = 'UnauthorizedError';
  }
}

class ErrorHandler {
  static handle(error: Error) {
    return error;
  }
}

export { ErrorHandler, UnauthorizedError };
