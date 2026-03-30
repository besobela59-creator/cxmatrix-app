import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { loginSchema, LoginInput } from "@/lib/validations/auth";
import { createSession } from "@/lib/session";

export async function loginUser(data: LoginInput) {
  const validated = loginSchema.parse(data);

  const user = await prisma.user.findUnique({
    where: { username: validated.username },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(validated.password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }

  await createSession({
    userId: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
  });

  return { id: user.id, username: user.username, name: user.name, role: user.role };
}
