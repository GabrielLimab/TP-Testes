import { Prisma } from "@prisma/client";
import prisma from "../../../../libs/prisma";

class UserRepositoryClass {
  selectOptions = {
    id: true,
    name: true,
    email: true,
    created_at: true,
  };

  async getUserByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }

  async createUser(userData: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data: userData,
    });

    return user;
  }

  async getAllUsers() {
    const users = await prisma.user.findMany({
      select: this.selectOptions,
    });

    return users;
  }

  async getUserById(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      select: this.selectOptions,
    });

    return user;
  }

  async editUser(id: string, userData: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: userData,
    });

    return user;
  }

}

export const UserRepository = new UserRepositoryClass();