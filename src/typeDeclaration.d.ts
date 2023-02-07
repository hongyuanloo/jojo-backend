import { Request } from "express";

//! temporary not use.
// export interface IGetUserAuthInfoRequest extends Request {
//   user?: { id: string; username: string; role: string };
// }

// IUserInfoJwtPayload includes properties from both JwtPayload and ItokenPayLoad
export interface IUserInfoJwtPayload extends JwtPayload, ItokenPayLoad {}

// interface for token payload used in jwt.
export interface ItokenPayLoad {
  id: string;
  username: string;
  role: string;
}
