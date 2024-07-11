import jsonwebtoken from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
export default function (req: Request, res: Response, next: NextFunction) {
  let token = req.headers.authorization;

  const fallbackRegex = /Bearer /g;

  if (token && fallbackRegex.test(token)) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jsonwebtoken.verify(token, process.env.JWT_SECRET as string, (err: any) => {
      if (err) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      } else {
        next();
      }
    });
  } else {
    res.status(403).json({
      status: false,
      message: 'User is not authorized',
    });
  }
}
