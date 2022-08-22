import { mailer } from "../../../lib/mailer";
import { prisma } from "../../../lib/prisma";
import { verifyJwtToken } from "../../verify-jwt-token";

type DecodedJwt = {
  subject: string;
  content: string;
  author: { id: string; name: string; email: string };
};

class ConfirmService {
  async exec(token: string) {
    if (!token) throw new Error("Request must contain parameter `token`");

    const { subject, content, author } = verifyJwtToken<DecodedJwt>(token);

    if (!subject || !content) throw new Error("Invalid token");

    const readers = await prisma.reader.findMany();

    const sendResponse = await mailer.sendMail({
      from: {
        name: author.name,
        address: author.email,
      },
      to: readers.map((reader) => reader.email),

      subject: `[Newsletter]: ${subject}`,
      html: content,
    });

    const notificationResponse = await mailer.sendMail({
      from: {
        name: author.name,
        address: author.email,
      },
      to: author.email,

      subject: `[Newsletter Confirmed]: ${subject}`,
      html: `<h1>Newsletter successfully published!</h1>`,
    });

    return { sendResponse, notificationResponse };
  }
}

export { ConfirmService };
