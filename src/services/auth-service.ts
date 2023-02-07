import { compare, hash } from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import crypto from "crypto";
import { ItokenPayLoad, IUserInfoJwtPayload } from "../typeDeclaration";

// given password, hash it with saltRounds defined.
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  try {
    return await hash(password, saltRounds);
  } catch (error) {
    throw error;
  }
}

// compare if password matches hashedPassword,
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

// generate 64 random bytes in string.
function generateRandomBytes() {
  /* generate 64 random bytes and convert to hex format.
  -Use this to generate "ACCESS_TOKEN_SECRET" and "REFRESH_TOKEN_SECRET" */
  const buffer = crypto.randomBytes(64).toString("hex");
  return buffer;
}

// given tokenPayLoad, generate access token using secret key.
export function generateAccessToken(tokenPayLoad: ItokenPayLoad): string {
  // generate access token based on tokenPayLoad
  const secretKey = process.env.ACCESS_TOKEN_SECRET as Secret;
  const lifeSpan = parseInt(process.env.ACCESS_TOKEN_LIFESPAN || "61");

  return jwt.sign(tokenPayLoad, secretKey, {
    expiresIn: lifeSpan,
  });
}

// given tokenPayLoad, generate refresh token using secret key.
export function generateRefreshToken(tokenPayLoad: ItokenPayLoad): string {
  // generate refresh token based on tokenPayLoad
  const secretKey = process.env.REFRESH_TOKEN_SECRET as Secret;
  const lifeSpan = parseInt(process.env.REFRESH_TOKEN_LIFESPAN || "600");

  return jwt.sign(tokenPayLoad, secretKey, {
    expiresIn: lifeSpan,
  });
}

// given Authentication Bearer Token, extract the token and return
export function extractTokenFromBearerToken(bearerToken: string): string {
  return bearerToken.split(" ")[1];
}

// given jwtToken, if token is valid(or not expired) return ItokenPayLoad
export function verifyJWTAccessToken(token: string) {
  try {
    //return decoded payload object
    //error if token mismatch or expired.
    const { id, username, role } = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as Secret
    ) as IUserInfoJwtPayload;

    // return only "ItokenPayLoad" information
    return { id, username, role } as ItokenPayLoad;
  } catch (err) {
    throw err;
  }
}

// given jwtToken, if token is valid(or not expired) return ItokenPayLoad
export function verifyJWTRefreshToken(token: string) {
  try {
    //return decoded payload object
    //error if token mismatch or expired.
    const { id, username, role } = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as Secret
    ) as IUserInfoJwtPayload;

    // return only "ItokenPayLoad" information
    return { id, username, role } as ItokenPayLoad;
  } catch (err) {
    throw err;
  }
}
