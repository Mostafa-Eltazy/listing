import { User, Listing } from '@prisma/client';
import { prisma } from '../database';

export interface IUserService {
  updateUser(userId: number, updatedData: Partial<User>): Promise<User>;
  getUser(userId: number): Promise<User | null>;
}

export class UserService implements IUserService {
  public async updateUser(userId: number, updatedData: Partial<User>): Promise<User> {
    return prisma.user.update({ where: { id: userId }, data: { ...updatedData } });
  }

  public async getUser(userId: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id: userId } });
  }
}
