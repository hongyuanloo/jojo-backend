import { compare, hash } from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import crypto from "crypto";
// import dotenv from "dotenv";
// dotenv.config();

// hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  try {
    return await hash(password, saltRounds);
  } catch (error) {
    throw error;
  }
}

export async function isPasswordMatched(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    return await compare(password, hashedPassword);
  } catch (error) {
    throw error;
  }
}

function generateRandomBytes() {
  /* generate 64 random bytes and convert to hex format.
  -Use this to generate "ACCESS_TOKEN_SECRET" and "REFRESH_TOKEN_SECRET" */
  const buffer = crypto.randomBytes(64).toString("hex");
  return buffer;
}

// export function generateTokenPayload(userObj: { email: string; role: string }) {
//   return userObj;
// }

export interface ItokenPayLoad {
  email: string;
  role: string;
}

export function generateAccessToken(tokenPayLoad: ItokenPayLoad): string {
  // generate access token based on tokenPayLoad
  const secretKey = process.env.ACCESS_TOKEN_SECRET as Secret;
  const lifeSpan = parseInt(process.env.ACCESS_TOKEN_LIFESPAN || "61");

  return jwt.sign(tokenPayLoad, secretKey, {
    expiresIn: lifeSpan,
  });
}

export function generateRefreshToken(tokenPayLoad: ItokenPayLoad): string {
  // generate refresh token based on tokenPayLoad
  const secretKey = process.env.REFRESH_TOKEN_SECRET as Secret;
  const lifeSpan = parseInt(process.env.REFRESH_TOKEN_LIFESPAN || "600");

  return jwt.sign(tokenPayLoad, secretKey, {
    expiresIn: lifeSpan,
  });
}

export function extractTokenFromBearerToken(bearerToken: string): string {
  return bearerToken.split(" ")[1];
}

export function verifyJWTRefreshToken(token: string) {
  try {
    //return decoded payload object
    //error if token mismatch or expired.
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as Secret);
  } catch (err) {
    throw err;
  }
}
