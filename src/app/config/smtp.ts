import "dotenv/config";

const HOST = process.env.SMTP_HOST;
const PORT = process.env.SMTP_PORT;
const USER = process.env.SMTP_USER;
const PASS = process.env.SMTP_PASS;

const smtp = {
  host: String(HOST),
  port: Number(PORT),
  user: String(USER),
  pass: String(PASS),
};

export { smtp };
