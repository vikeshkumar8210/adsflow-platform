import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const data = await AuthService.login(email, password);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
}