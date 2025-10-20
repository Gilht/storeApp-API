import { Request, Response, NextFunction } from "express";

export default class CacheRedis {
  static handle(tagName: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let key = tagName;

      if (req.query) {
        for (const prop in req.query) {
          key += `_${req.query[prop]}`;
        }
      }

      if (req.params) {
        for (const prop in req.params) {
          key += `_${req.params[prop]}`;
        }
      }

      if (req.body) {
        for (const prop in req.body) {
          key += `_${req.body[prop]}`;
        }
      }

      next();
    };
  }
}
