import { Request, Response } from "express";
import { container } from "tsyringe";

import { RenewRefreshTokenUseCase } from "./RenewRefreshTokenUseCase";

class RenewRefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const renewRefreshTokenUseCase = container.resolve(
      RenewRefreshTokenUseCase
    );

    const data = await renewRefreshTokenUseCase.execute(
      request.cookies["appfin.refreshToken"]
    );

    response.cookie("appfin.token", data.token, {
      sameSite: "none",
      secure: true,
      expires: data.tokenExpiration,
    });
    response.cookie("appfin.refreshToken", data.refreshToken, {
      sameSite: "none",
      secure: true,
      expires: data.refreshTokenExpiration,
    });

    return response.json({
      token: data.token,
      refreshToken: data.refreshToken,
    });
  }
}

export { RenewRefreshTokenController };
