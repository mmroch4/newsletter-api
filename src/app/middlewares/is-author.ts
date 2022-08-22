import { NextFunction, Request, Response } from "express";
import { Response as ApiResponse } from "../interface/Response";
import { verifyJwtToken } from "../services/verify-jwt-token";

type DecodedJwt = {
  id: string;
  name: string;
  email: string;
};

function isAuthor(req: Request, res: Response, next: NextFunction) {
  const authBearerToken = req.headers.authorization;

  if (!authBearerToken) {
    return res.status(401).json({
      success: false,
      message: "Request unauthorized",
      payload: {},
    } as ApiResponse);
  }

  const [, token] = authBearerToken.split(" ");

  try {
    const { id, name, email } = verifyJwtToken<DecodedJwt>(token);

    req.author_id = id;
    req.author_name = name;
    req.author_email = email;

    return next();
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: "Request unauthorized",
      payload: {},
    } as ApiResponse);
  }
}

export { isAuthor };
