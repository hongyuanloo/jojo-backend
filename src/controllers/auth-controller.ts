import { Request, Response } from "express";
import prisma from "../models";
import { getErrorMessage } from "../utils/error-util";
import httpStatus from "http-status";
import {
  extractTokenFromBearerToken,
  generateAccessToken,
  generateRefreshToken,
  isPasswordMatched,
  ItokenPayLoad,
  verifyJWTRefreshToken,
} from "../services/auth-service";
import { JwtPayload } from "jsonwebtoken";

// Given email and password, authenticate and return { accessToken, refreshToken, user: { id, username, role },}
export async function authenticateUser(req: Request, res: Response) {
  //check email and password
  const userInfor = { ...req.body };
  userInfor.email = userInfor.email.toLowerCase();

  try {
    // check if email is found
    const foundUser = await prisma.user.findUnique({
      where: {
        email: userInfor.email,
      },
    });
    // console.log("--foundUser--", foundUser);
    // email not found, return httpStatus.NOT_FOUND
    if (!foundUser) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: `${userInfor.email} does'nt exist.` });
    }

    //compare password.
    const passwordOk = await isPasswordMatched(
      userInfor.password,
      foundUser.password
    );

    // password wrong, return httpStatus.FORBIDDEN
    if (!passwordOk) {
      return res
        .status(httpStatus.FORBIDDEN)
        .json({ error: "Wrong password." });
    }

    // everything is good, generate accessToken and refreshToken generateRefreshToken
    const tokenPayload: ItokenPayLoad = {
      email: foundUser.email,
      role: foundUser.role,
    };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    const { id, username, role } = foundUser;

    res.status(httpStatus.OK).json({
      accessToken,
      refreshToken,
      user: { id, username, role },
    });
  } catch (error) {
    // handle any other error.
    const errMessage = getErrorMessage(error);

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: errMessage });
  } finally {
    // disconnect from db.
    await prisma.$disconnect();
  }
}

// Given refreshToken that is not expired, return new accessToken.
export function getNewAccessToken(req: Request, res: Response) {
  try {
    // extract refreshToken
    const refreshToken = extractTokenFromBearerToken(
      req.headers.authorization || ""
    );

    // token is ""
    if (!refreshToken) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ error: "invalid token." });
    }

    //if refreshToken is ok, return decoded payload object
    const decodedTokenPayload = verifyJWTRefreshToken(refreshToken);

    const { email, role } = decodedTokenPayload as JwtPayload;

    // form new tokenPayload and generate new accessToken
    const tokenPayload: ItokenPayLoad = { email, role };
    const newAccessToken = generateAccessToken(tokenPayload);

    // return new accessToken
    res.status(httpStatus.OK).json({ accessToken: newAccessToken });
  } catch (error) {
    // handle any other error.
    const errMessage = getErrorMessage(error);

    res.status(httpStatus.UNAUTHORIZED).json({ error: errMessage });
  }
}
