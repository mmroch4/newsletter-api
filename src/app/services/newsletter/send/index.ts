import { domain } from "../../../config";
import { mailer } from "../../../lib/mailer";
import { signJwtToken } from "../../sign-jwt-token";

class SendService {
  async exec({
    subject,
    content,
    author,
  }: {
    subject: string;
    content: string;
    author: { id: string; name: string; email: string };
  }) {
    if (!subject || !content)
      throw new Error(
        "Request must contain `subject` and `content` in it's body"
      );

    const token = signJwtToken({ subject, content, author }, { expiresIn: "15m" });

    const response = await mailer.sendMail({
      from: {
        name: author.name,
        address: author.email,
      },
      to: author.email,

      subject: `[Newsletter Confirmation]: ${subject}`,
      html: `<a href="${domain}/newsletter/send/${token}" target="_blank" rel="noreferrer">Confirm publication</a> <br /> <hr /> <br /> ${content}`,
    });

    return response;
  }
}

export { SendService };
