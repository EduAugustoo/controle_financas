import { Request, Response } from "express";
import { container } from "tsyringe";

import { RenewRefreshTokenUseCase } from "./RenewRefreshTokenUseCase";

class RenewRefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const renewRefreshTokenUseCase = container.resolve(
      RenewRefreshTokenUseCase
    );

    const { token, refreshToken } = await renewRefreshTokenUseCase.execute(
      request.cookies["appfin.refreshToken"]
    );

    return response.json({ token, refreshToken });
  }
}

export { RenewRefreshTokenController };
