import { Response, Request, NextFunction } from "express";
import { ItokenPayLoad } from "../typeDeclaration";
import {
  extractTokenFromBearerToken,
  verifyJWTAccessToken,
} from "../services/auth-service";
import { JsonWebTokenError } from "jsonwebtoken";
import httpStatus from "http-status";
import { getErrorMessage } from "../utils/error-util";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /*Authenticate accessToken:
  1. token extracted from "bearer token" in req.headers.authorization.
  2. store user data extracted from payload in "res.locals.user = { id, username, role };" , for use in next().
  3. token only useable within its life span.
  */
  try {
    // extract token
    const accessToken = extractTokenFromBearerToken(
      req.headers.authorization ?? ""
    );

    // token is ""
    if (!accessToken) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ error: "invalid token." });
    }

    //get decoded payload object from JWT; error if token mismatch or expired.
    const { id, username, role } = verifyJWTAccessToken(accessToken);

    // user information to "res.locals.user" so that next middleware can access them.
    res.locals.user = {
      id: id,
      username: username,
      role: role,
    } as ItokenPayLoad;

    //! development use only!
    res.locals.user = {
      role: "ADMIN",
    };

    console.log("--accessToken ok.--");
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      if (error.message === "jwt expired") {
        return res.status(httpStatus.FORBIDDEN).json({ error: error.message });
      }
      res.status(httpStatus.UNAUTHORIZED).json({ error: error.message });
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(getErrorMessage(error));
  }
}
