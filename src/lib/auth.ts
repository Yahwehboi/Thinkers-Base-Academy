import jwt from "jsonwebtoken";

const JWT_SECRET  = process.env.JWT_SECRET!;
const JWT_EXPIRES = "8h";

export function signToken(payload: { id: string; role: string; name: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

export function verifyToken(token: string): { id: string; role: string; name: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; role: string; name: string };
  } catch {
    return null;
  }
}