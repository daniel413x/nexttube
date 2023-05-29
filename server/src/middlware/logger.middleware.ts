import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import getHMMSS from 'src/utils/getHMMSS.util';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(
        `${getHMMSS()} - ${method} ${originalUrl} - ${
          res.statusCode
        } - ${duration}ms`,
      );
    });
    next();
  }
}
