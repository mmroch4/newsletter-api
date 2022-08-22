import bcrypt from "bcryptjs";
import isEmail from "validator/lib/isEmail";
import { address, domain, name } from "../../../config";
import { mailer } from "../../../lib/mailer";
import { prisma } from "../../../lib/prisma";
import { signJwtToken } from "../../sign-jwt-token";

class AuthService {
  async exec({ email, password }: { email: string; password: string }) {
    if (!email || !isEmail(email) || !password)
      throw new Error(
        "Request must contain a valid `email` and `password` in it's body"
      );

    const author = await prisma.author.findUnique({
      where: {
        email,
      },
    });

    if (!author) throw new Error("Invalid credentials");

    const isPasswordValid = await bcrypt.compare(password, author.password);

    if (!isPasswordValid) throw new Error("Invalid credentials");

    const token = signJwtToken(
      {
        email,
        password,
      },
      { expiresIn: "15m" }
    );

    const response = await mailer.sendMail({
      from: {
        name,
        address,
      },
      to: author.email,

      subject:
        "[Newsletter Author Auth Confirmation]: Complete the author auth here",
      html: `<h2>Click on the button to confirm the author creation</h2> <hr /> <a href="${domain}/author/auth/${token}" target="_blank" rel="noreferrer">Confirm my subscription</a>`,
    });

    return response;
  }
}

export { AuthService };
