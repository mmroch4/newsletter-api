import { Request, Response } from "express";
import { Response as ApiResponse } from "../../../interface/Response";
import { SendService } from "../../../services/newsletter/send";

class SendController {
  async handle(req: Request, res: Response) {
    const service = new SendService();

    const { subject, content } = req.body;
    const { author_id, author_name, author_email } = req;

    try {
      const result = await service.exec({
        subject,
        content,
        author: {
          id: author_id,
          name: author_name,
          email: author_email,
        },
      });

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

export { SendController };
