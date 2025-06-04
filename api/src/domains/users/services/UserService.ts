import { Prisma, User } from "@prisma/client";
import { hash } from 'bcrypt';
import { QueryError } from '../../../../errors/QueryError';
import prisma from "../../../../libs/prisma";

class UserServiceClass {
  selectOptions = {
    id: true,
    name: true,
    email: true,
    username: true,
    created_at: true,
  };

  private async encryptPassword(password: string) {
    const saltRounds = 10;
    const encryptedPassword = await hash(password, saltRounds);
    return encryptedPassword;
  }

  async create(body: Prisma.UserCreateInput) {
    const userEmail = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (userEmail) {
      throw new QueryError('Email already in use');
    }

    const userUsername = await prisma.user.findFirst({
      where: {
        username: body.username,
      },
    });
    
    if (userUsername) {
      throw new QueryError('Username already in use');
    }

    const encryptedPassword = await this.encryptPassword(body.password);

    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        username: body.username,
        email: body.email,
        password: encryptedPassword,
      },
    });

    return newUser;
  }

  async getAll() {
    const users = await prisma.user.findMany({
      select: this.selectOptions,
    });

    if (users.length === 0) {
      throw new QueryError('No users found');
    }
    
    return users;
  }

  async getById(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      select: this.selectOptions,
    });

    if (!user) {
      throw new QueryError('User not found');
    }

    return user;
  }

  async getByUsername(username: string) {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
      select: this.selectOptions,
    });

    if (!user) {
      throw new QueryError('User not found');
    }

    return user;
  }

  async edit(id: string, body: Partial<Omit<User, 'id'>>){
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new QueryError('User not found');
    }

    const userData = body;

    
    if (body.email) {
      const userEmail = await prisma.user.findFirst({
        where: {
          email: body.email,
        },
      });
      
      if (userEmail) {
        throw new QueryError('Email already in use');
      }
    }

    if (body.username) {
      const userUsername = await prisma.user.findFirst({
        where: {
          username: body.username,
        },
      });

      if (userUsername) {
        throw new QueryError('Username already in use');
      }
    }
    
    if (body.password) {
      const encryptedPassword = await this.encryptPassword(body.password);
      userData.password = encryptedPassword;
    }

    await prisma.user.update({  
      where:{id,
      },
      data: userData,
    });
  }

}
export const UserService = new UserServiceClass();