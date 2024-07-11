import Express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import baseRouter from './routes/v1/admin';

import db from './db/setup';
import { sql } from 'drizzle-orm';

import cors from 'cors';

import loginRouter from './routes/v1/admin/login';

import morgan from 'morgan';

import authGate from './middlewares/v1/authGate';

import { jwtCheck } from './middlewares/v1/jwtCheck';

// ? Testing DB Connection
try {
  db.execute(sql`select 1;`).then(async (response) => {
    if (response) {
      console.log('DB OK');
    }
  });
} catch (e) {
  console.error('DB Error', e);
  throw new Error('DB Error');
}

export const app = Express();
const port = process.env.PORT;

app.use(Express.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(Express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    message: 'Endpoints for Express TS Boilerplate API',
  });
});

app.use('/v1/sudo/login', loginRouter);

app.use('/v1/sudo', authGate, baseRouter);

app.use('/v1/admin', jwtCheck, baseRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!err) {
    next();
    return;
  }

  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  switch (typeof err) {
    case 'number':
      res.status(Number(err)).json({
        success: false,
        message: 'An error occurred, please contact support',
      });
      break;
    case 'object':
      if ('status' in err) {
        //@ts-ignore
        res.status(err.status).json({
          success: false,
          // @ts-ignore
          data: err.message,
        });
      } else {
        res.status(500).json({
          success: false,
          data: null,
          message: 'An Error Occurred! Please Contact Support',
        });
      }

      break;
    default:
      res.status(500).json({
        success: false,
        data: err,
        message: 'An Error Occurred',
      });
  }
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
