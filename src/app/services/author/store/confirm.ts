import isEmail from "validator/lib/isEmail";
import { mailer } from "../../../lib/mailer";
import { prisma } from "../../../lib/prisma";
import { verifyJwtToken } from "../../verify-jwt-token";

type DecodedJwt = {
  name: string;
  email: string;
  hashedPassword: string;
  author: { id: string; name: string; email: string };
};

class ConfirmService {
  async exec(token: string) {
    if (!token) throw new Error("Request must contain parameter `token`");

    const { name, email, hashedPassword, author } =
      verifyJwtToken<DecodedJwt>(token);

    if (!name || !email || !isEmail(email) || !hashedPassword)
      throw new Error("Invalid token");

    const storeResponse = await prisma.author.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const notificationResponse = await mailer.sendMail({
      from: {
        name: author.name,
        address: author.email,
      },
      to: author.email,

      subject: `[Newsletter Author Creation Confirmation]: Creation successfully confirmed`,
      html: `<h1>Newsletter author creation successfully confirmed!</h1>`,
    });

    return { storeResponse, notificationResponse };
  }
}

export { ConfirmService };
