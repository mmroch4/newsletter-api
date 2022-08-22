import { Request, Response } from "express";
import { Response as ApiResponse } from "../../../interface/Response";
import { ConfirmService } from "../../../services/author/auth/confirm";

class ConfirmController {
  async handle(req: Request, res: Response) {
    const service = new ConfirmService();

    const { token } = req.params;

    try {
      const result = await service.exec(token);

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

export { ConfirmController };
