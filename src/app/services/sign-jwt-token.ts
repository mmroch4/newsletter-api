import { sign, SignOptions } from "jsonwebtoken";

const JWT_TOKEN = process.env.JWT_SECRET as string;

function signJwtToken(
  payload: string | object | Buffer,
  options?: SignOptions | undefined
): string {
  const token = sign(payload, JWT_TOKEN, options);

  return token;
}

export { signJwtToken };
