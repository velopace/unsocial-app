export default abstract class BaseCustomError extends Error {
  abstract statusCode: number;

  protected constructor(message?: string) {
    super(message);
  }

  abstract getStatusCode(): number;

  abstract serializeErrorOutput(): unknown;
}
