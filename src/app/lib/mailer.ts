import { createTransport } from "nodemailer";
import { smtp } from "../config/smtp";

const { host, port, user, pass } = smtp;

const mailer = createTransport({
  host,
  port,
  auth: {
    user,
    pass,
  },
});

export { mailer };
