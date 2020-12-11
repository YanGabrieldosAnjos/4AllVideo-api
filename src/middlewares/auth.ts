import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
export async function verifyJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = <string>req.headers["auth"];
  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, process.env.SECRET!);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send();
    return;
  }

  const newToken = jwt.sign({ jwtPayload }, process.env.SECRET!, {
    expiresIn: "300",
  });
  res.setHeader("token", newToken);

  next();
}
