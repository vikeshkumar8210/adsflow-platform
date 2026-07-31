import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../utils/errors';
import { JwtPayloadData, verifyToken } from '../utils/jwt';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadData;
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Missing token in Authorization header'));
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return next(new UnauthorizedError('Malformed token provided'));
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    next(new UnauthorizedError('Invalid or expired token'));
  }
};