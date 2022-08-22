import { Request, Response } from "express";
import { Response as ApiResponse } from "../../interface/Response";
import { RegisterService } from "../../services/register";

class RegisterController {
  async handle(req: Request, res: Response) {
    const service = new RegisterService();

    const { name, email } = req.body;

    try {
      const result = await service.exec({ name, email });

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

export { RegisterController };
