import { NextFunction, Request, Response } from 'express';
import { ForbiddenError } from '../utils/errors';

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError('You do not have permission for this route'));
    }
    next();
  };
};