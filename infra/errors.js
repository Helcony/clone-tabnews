export class InternalServerError extends Error {
  constructor({ cause }) {
    super("An unexpected internal error has occurred", {
      cause,
    });
    this.name = "InternalServerError"
    this.action = "Please try again later. If the problem persists, please get in touch with the support team."
    this.statusCode = 500
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    }
  }
}
