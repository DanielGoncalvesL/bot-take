import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';

import cors from 'cors';

import morgan from 'morgan';

import AppError from '@shared/errors/AppError';

import '@shared/container';

import routes from '@shared/infra/http/routes/index';

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan('dev'));

app.use(routes);

app.use((error: Error, _: Request, response: Response, __: NextFunction) => {
  if (error instanceof AppError) {
    const { statusCode } = error;

    return response.status(statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.log(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`\n🚀 Server started on port ${port}!`);
});

export default app;
