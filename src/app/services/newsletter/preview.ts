import { mailer } from "../../lib/mailer";

class PreviewService {
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

    const response = await mailer.sendMail({
      from: {
        name: author.name,
        address: author.email,
      },
      to: author.email,

      subject: `[Newsletter Preview]: ${subject}`,
      html: content,
    });

    return response;
  }
}

export { PreviewService };
