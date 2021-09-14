import { AppError } from "./AppError";

class TokenError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}

export { TokenError };
