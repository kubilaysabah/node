import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(request: Request, response:Response, next: NextFunction): Response {
  return response.send('hello world!');
});

export default router;
