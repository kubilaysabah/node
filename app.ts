import createError, { type HttpError } from 'http-errors';
import express, { type NextFunction, type Request, type Response } from 'express';
import path from 'path'
import cookieParser from 'cookie-parser';
import logger from 'morgan'

import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((error: HttpError, request: Request, response: Response, next: NextFunction): void => {
  // set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};

  // render the error page
  response.status(200).send({
    error: true
  })
});

app.listen(3000, () => {
  console.log('Server is running on port 3000')
});

export default app;
