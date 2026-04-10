import jwt from "jsonwebtoken";

export const ADMIN_COOKIE = "admin_token";
export const USER_COOKIE  = "user_token";
export const MAX_AGE      = 60 * 60 * 8; // 8 hours

export type JwtPayload = { id: string; email: string; role: "admin" | "user" };

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return secret;
}

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, getSecret(), { expiresIn: MAX_AGE });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, getSecret()) as JwtPayload;
  } catch {
    return null;
  }
}

export const COOKIE = ADMIN_COOKIE;
