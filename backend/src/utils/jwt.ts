import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface JwtPayloadData {
  userId: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'CLIENT';
}

export const generateToken = (payload: JwtPayloadData): string => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token: string): JwtPayloadData => {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayloadData;
};