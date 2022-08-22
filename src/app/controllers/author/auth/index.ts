import { Request, Response } from "express";
import { Response as ApiResponse } from "../../../interface/Response";
import { AuthService } from "../../../services/author/auth";

class AuthController {
  async handle(req: Request, res: Response) {
    const service = new AuthService();

    const { email, password } = req.body;

    try {
      const result = await service.exec({ email, password });

      return res.status(200).json({
        success: true,
        message: "Everything ok!",
        payload: result,
      } as ApiResponse);
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message,
        payload: {},
      } as ApiResponse);
    }
  }
}

export { AuthController };
