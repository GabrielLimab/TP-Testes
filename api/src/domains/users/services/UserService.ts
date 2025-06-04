import { hash } from 'bcrypt';
import { QueryError } from '../../../../errors/QueryError';
import { UserRepository } from "../repositories/UserRepository";

class UserServiceClass {
  private async encryptPassword(password: string) {
    const saltRounds = 10;
    const encryptedPassword = await hash(password, saltRounds);
    return encryptedPassword;
  }

  async create(body: { name: string; email: string; password: string;}) {
    const user = await UserRepository.getUserByEmail(body.email);

    if (user) {
      throw new QueryError('Email already in use');
    }
    
    const encryptedPassword = await this.encryptPassword(body.password);
    const newUser = await UserRepository.createUser({...body, password: encryptedPassword});
    return newUser;
  }

  async getAll() {
    const users = await UserRepository.getAllUsers();

    if (users.length === 0) {
      throw new QueryError('No users found');
    }
    
    return users;
  }

  async getById(id: string) {
    const user = await UserRepository.getUserById(id);

    if (!user) {
      throw new QueryError('User not found');
    }

    return user;
  }

  async edit(id: string, body: { name?: string; email?: string; password?: string;}) {
    const user = await this.getById(id);

    if (!user) {
      throw new QueryError('User not found');
    }

    const userData = body;

    if (body.email) {
      const user = await UserRepository.getUserByEmail(body.email);
      
      if (user) {
        throw new QueryError('Email already in use');
      }
    }
    
    if (body.password) {
      const encryptedPassword = await this.encryptPassword(body.password);
      userData.password = encryptedPassword;
    }

    const editedUser = await UserRepository.editUser(id, userData);
    return editedUser;
  }
}

export const UserService = new UserServiceClass();