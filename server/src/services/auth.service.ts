import { User } from '@prisma/client';
import { prisma } from '../database';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../common/errors';
import { UserWithInfo } from '../common/interfaces/user-with-data.interface';

export interface IAuthService {
  registerUserAndSignToken(userData: Partial<User>): Promise<{ token: string; newUser: User }>;
  loginUserAndSignToken(userData: { email?: string; username?: string; password: string }): Promise<{ user: UserWithInfo; token: string }>;
}

export class AuthService implements IAuthService {
  private AUTH_TOKEN_EXPIRY = '7d';

  public async registerUserAndSignToken(userData: Partial<User>): Promise<{ token: string; newUser: User }> {
    const { email, password, username, profilePicture, firstname, lastname } = userData;
    const hashedPassword = await this.hashPassword(password as string);
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        profilePicture,
        firstname,
        lastname
      } as User,
    });

    const token = await this.generateSignedUserToken(newUser.id);
    return { token, newUser };
  }

  public async loginUserAndSignToken(userData: { email?: string; username?: string; password: string }): Promise<{ user: UserWithInfo; token: string }> {
    const { email, password, username } = userData;

    const user = await prisma.user.findUniqueOrThrow({
      where: { username, email },
      select: { id: true, username: true, email: true, profilePicture: true, password: true, firstname:true, lastname:true },
    });

    const isPasswordValid = await this.comparePassword(password as string, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }
    const token = await this.generateSignedUserToken(user.id);

    return { user, token };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  private async comparePassword(password: string, passwordDB: string): Promise<boolean> {
    return bcrypt.compare(password, passwordDB);
  }

  private async generateSignedUserToken(id: number): Promise<string> {
    return jwt.sign({ id }, process.env.SECRET_KEY as string, {
      expiresIn: this.AUTH_TOKEN_EXPIRY,
    });
  }
}
