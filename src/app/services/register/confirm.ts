import isEmail from "validator/lib/isEmail";
import { address as addressConfig, name as nameConfig } from "../../config";
import { mailer } from "../../lib/mailer";
import { prisma } from "../../lib/prisma";
import { verifyJwtToken } from "../verify-jwt-token";

type DecodedJwt = { name: string; email: string };

class ConfirmService {
  async exec(token: string) {
    if (!token) throw new Error("Request must contain parameter `token`");

    const { name, email } = verifyJwtToken<DecodedJwt>(token);

    if (!email || !isEmail(email)) throw new Error("Invalid token");

    const storeResponse = await prisma.reader.create({
      data: {
        name,
        email,
      },
    });

    const notificationResponse = await mailer.sendMail({
      from: {
        name: nameConfig,
        address: addressConfig,
      },
      to: email,

      subject: `[Newsletter Subscription Confirmation]: Subscription successfully confirmed`,
      html: `<h1>Newsletter subscription successfully confirmed!</h1>`,
    });

    return { storeResponse, notificationResponse };
  }
}

export { ConfirmService };
