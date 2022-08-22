import { verify } from "jsonwebtoken";

const JWT_TOKEN = process.env.JWT_SECRET as string;

function verifyJwtToken<DecodedJwt>(token: string): DecodedJwt {
  const decodedJwt = verify(token, JWT_TOKEN) as DecodedJwt;

  return decodedJwt;
}

export { verifyJwtToken };
