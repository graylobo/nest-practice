import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // const name: string = req.query.name || req.body.name;

    next();

    // if (name == 'Ryan') {
    //   next();
    // } else {
    //   // Ryan 유저가 아니라면 허가 받지 않은 유저이기 때문에 401 Error를 반환
    //   throw new UnauthorizedException();
    // }
  }
}
