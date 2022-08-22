import isEmail from "validator/lib/isEmail";
import { domain } from "../../../config";
import { mailer } from "../../../lib/mailer";
import { prisma } from "../../../lib/prisma";
import { hash } from "../../hash";
import { signJwtToken } from "../../sign-jwt-token";

class StoreService {
  async exec({
    name,
    email,
    password,
    author,
  }: {
    name: string;
    email: string;
    password: string;
    author: { id: string; name: string; email: string };
  }) {
    if (!name || !email || !isEmail(email) || !password)
      throw new Error(
        "Request must contain `name`, a valid `email` and `password` in it's body"
      );

    const isEmailBeingUsed = await prisma.author.findUnique({
      where: {
        email,
      },
    });

    if (isEmailBeingUsed) throw new Error("`email` is already being used");

    const hashedPassword = await hash(password);

    const token = signJwtToken(
      { name, email, hashedPassword, author },
      { expiresIn: "15m" }
    );

    const response = await mailer.sendMail({
      from: {
        name: author.name,
        address: author.email,
      },
      to: author.email,

      subject:
        "[Newsletter Author Creation Confirmation]: Complete the author creation here",
      html: `<h2>Click on the button to confirm the author creation</h2> <hr /> <a href="${domain}/author/create/${token}" target="_blank" rel="noreferrer">Confirm my subscription</a>`,
    });

    return response;
  }
}

export { StoreService };
