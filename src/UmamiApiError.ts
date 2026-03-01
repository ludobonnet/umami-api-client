export class UmamiApiError extends Error {
  status: number;
  response?: unknown;

  constructor(message: string, status: number, response?: unknown) {
    super(message);
    this.name = 'UmamiApiError';
    this.status = status;
    this.response = response;
  }
}
