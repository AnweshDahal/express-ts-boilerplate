import { Request, Response, NextFunction } from 'express';
import loginService from '../../../../services/v1/admin/auth/loginService';
import jsonwebtoken from 'jsonwebtoken';

export default async function loginController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await loginService({
      userName: req.body.username,
      password: req.body.password,
    });
    if (!('JWT_SECRET' in process.env)) {
      throw 500;
    }

    const jwt = jsonwebtoken.sign(
      {
        user: user,
      },
      process.env.JWT_SECRET || '',
      {
        expiresIn: '1h',
      },
    );

    res.status(200).json({
      success: true,
      data: { token: jwt },
      message: 'Login Successful',
    });
  } catch (err) {
    next(err);
  }
}
