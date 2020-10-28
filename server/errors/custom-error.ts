export abstract class CustomError extends Error {
  /**
   * Status Code of the error
   */
  abstract statusCode: number;
  /**
   * Message for the error
   */
  constructor(message: string) {
    super(message);
    /**
     * Since we are trying to use a built in class
     */
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  /**
   * This seralizes the errors
   */
  abstract serializeErrors(): { message: string; field?: string }[];
}
