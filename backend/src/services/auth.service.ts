import bcrypt from 'bcryptjs';
import { UnauthorizedError } from '../utils/errors';
import { generateToken } from '../utils/jwt';

export class AuthService {
  private static mockUser = {
    id: 'usr-101',
    email: 'admin@adsflow.io',
    passwordHash: bcrypt.hashSync('AdminPass123!', 10),
    role: 'ADMIN' as const,
  };

  public static async login(email: string, password: string) {
    if (email !== this.mockUser.email) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, this.mockUser.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const token = generateToken({
      userId: this.mockUser.id,
      email: this.mockUser.email,
      role: this.mockUser.role,
    });

    return {
      token,
      user: { id: this.mockUser.id, email: this.mockUser.email, role: this.mockUser.role },
    };
  }
}