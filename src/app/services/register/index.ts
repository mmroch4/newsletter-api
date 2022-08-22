import isEmail from "validator/lib/isEmail";
import {
  address as addressConfig,
  domain,
  name as nameConfig,
} from "../../config";
import { mailer } from "../../lib/mailer";

import { prisma } from "../../lib/prisma";
import { signJwtToken } from "../sign-jwt-token";

class RegisterService {
  async exec({ name, email }: { name: string; email: string }) {
    if (!email || !isEmail(email))
      throw new Error("Request must contain a valid `email` in it's body");

    const isEmailBeingUsed = await prisma.reader.findUnique({
      where: {
        email,
      },
    });

    if (isEmailBeingUsed) throw new Error("`email` is already being used");

    const token = signJwtToken({ name, email }, { expiresIn: "15m" });

    const response = await mailer.sendMail({
      from: {
        name: nameConfig,
        address: addressConfig,
      },
      to: email,

      subject:
        "[Newsletter Subscription Confirmation]: Complete your subscription here",
      html: `<h2>Click on the button to confirm your subscription</h2> <hr /> <a href="${domain}/register/${token}" target="_blank" rel="noreferrer">Confirm my subscription</a>`,
    });

    return response;
  }
}

export { RegisterService };
