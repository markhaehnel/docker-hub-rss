class HttpError extends Error {
  readonly statusCode: number;
  readonly internalMessage?: string;

  constructor(message: string, statusCode: number, internalMessage?: string) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.internalMessage = internalMessage;
  }
}

export { HttpError };
