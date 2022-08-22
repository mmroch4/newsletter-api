import bcrypt from "bcryptjs";

async function hash(s: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);

  const hashed = await bcrypt.hash(s, salt);

  return hashed;
}

export { hash };
