import BaseCustomError from './base-custom-error';

export default class InvalidInput extends BaseCustomError {
  statusCode = 422;

  constructor() {
    super('The input provided is invalid');
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrorOutput(): unknown {
    return undefined;
  }
}
