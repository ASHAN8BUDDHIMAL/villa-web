import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export const ADMIN_COOKIE = "admin_token";
export const USER_COOKIE  = "user_token";
export const MAX_AGE      = 60 * 60 * 8; // 8 hours

export type JwtPayload = { id: string; email: string; role: "admin" | "user" };

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, SECRET, { expiresIn: MAX_AGE });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

// Keep backward compat — admin middleware uses COOKIE
export const COOKIE = ADMIN_COOKIE;
