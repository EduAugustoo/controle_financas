import { Request, Response } from "express";
import { container } from "tsyringe";

import { SignOutUseCase } from "./SignOutUseCase";

class SignOutController {
  async handle(request: Request, response: Response): Promise<Response> {
    const signOutUseCase = container.resolve(SignOutUseCase);
    await signOutUseCase.execute(request.cookies["appfin.refreshToken"]);
    return response.status(200).send();
  }
}

export { SignOutController };
