import bcrypt from "bcryptjs";
import isEmail from "validator/lib/isEmail";
import { address, name } from "../../../config";
import { mailer } from "../../../lib/mailer";
import { prisma } from "../../../lib/prisma";
import { signJwtToken } from "../../sign-jwt-token";
import { verifyJwtToken } from "../../verify-jwt-token";

type DecodedJwt = {
  email: string;
  password: string;
};

class ConfirmService {
  async exec(token: string) {
    if (!token) throw new Error("Request must contain parameter `token`");

    const { email, password } = verifyJwtToken<DecodedJwt>(token);

    if (!email || !isEmail(email) || !password)
      throw new Error("Invalid token");

    const author = await prisma.author.findUnique({
      where: {
        email,
      },
    });

    if (!author) throw new Error("Invalid credentials");

    const isPasswordValid = await bcrypt.compare(password, author.password);

    if (!isPasswordValid) throw new Error("Invalid credentials");

    const authToken = signJwtToken(
      { id: author.id, name: author.name, email: author.email },
      {
        subject: author.id,
        expiresIn: "4h",
      }
    );

    const response = await mailer.sendMail({
      from: {
        name,
        address,
      },
      to: author.email,

      subject: `[Newsletter Author Auth Confirmation]: Auth successfully confirmed`,
      html: `<h1>Newsletter author Auth successfully confirmed!</h1>`,
    });

    return { token: authToken, response };
  }
}

export { ConfirmService };
