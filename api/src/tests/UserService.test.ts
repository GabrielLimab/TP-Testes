import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { UserRepository } from '../domains/users/repositories/UserRepository';
import { UserService } from '../domains/users/services/UserService';
import prisma from '../libs/__mocks__/prisma';

vi.mock('../libs/prisma');
vi.mock('bcrypt', () => ({
  hash: vi.fn((password: string, saltRounds: number) => 'encryptedPassword'),
}));
vi.mock('@prisma/client', () => {
  return {
    PrismaClient: vi.fn().mockImplementation(() => ({
      user: {
        findFirst: vi.fn(),
        create: vi.fn(),
        findMany: vi.fn(),
      },
    })),
  };
});

vi.mock('../domains/users/repositories/UserRepository', () => {
  return {
    UserRepository: {
      getUserByEmail: vi.fn(),
      createUser: vi.fn(),
      getAllUsers: vi.fn(),
      getUserById: vi.fn(),
      editUser: vi.fn(),
    },
  };
});

// const prisma = new PrismaClient();

const selectOptions = {
  id: true,
  name: true,
  email: true,
  ratings: true,
  created_at: true,
};

describe('create', () => {
  let createBody: Prisma.UserCreateInput;
  
  beforeEach(() => {
    vi.restoreAllMocks();
    
    createBody = {
      email: 'test@test.com',
      password: 'test',
      name: 'test',
    }
  });

  test('should call getUserByEmail with email', async () => {
    const createBody = { email: 'test@test.com', password: 'password123', name: 'test' };

    (UserRepository.getUserByEmail as any).mockResolvedValue(null); // Mockando para retornar null, indicando que o usuário não existe

    await UserService.create(createBody);

    expect(UserRepository.getUserByEmail).toHaveBeenNthCalledWith(1, createBody.email);
  });

  test('should throw an error if user already exists', async () => {

    (UserRepository.getUserByEmail as any).mockResolvedValue({ email: 'test@test.com' });

    await expect(UserService.create(createBody)).rejects.toThrow('Email already in use');
  });

  test('should call encryptPassword', async () => {
    prisma.user.findFirst.mockResolvedValueOnce(null);
    prisma.user.findFirst.mockResolvedValueOnce(null);

    await UserService.create(createBody);

    expect(bcrypt.hash).toHaveBeenCalledWith(createBody.password, 10);
  });

  test('should call create with encrypted password', async () => {
    prisma.user.findFirst.mockResolvedValueOnce(null);
    prisma.user.findFirst.mockResolvedValueOnce(null);

    await UserService.create(createBody);

    expect(UserRepository.createUser).toHaveBeenCalledWith({
      ...createBody,
      password: 'encryptedPassword',
    });
  });

});

describe('getAll', () => {
  let findManyUsers: User[];

  beforeEach(() => {
    vi.restoreAllMocks();

    findManyUsers = [
      {
        id: '1',
        name: 'test',
        email: 'test@test.com',
        password: 'test',
        created_at: new Date('01-01-2023'),
      },
    ];
  });

  test('should return users', async () => {
    (UserRepository.getAllUsers as any).mockResolvedValueOnce(findManyUsers);

    const users = await UserService.getAll();

    expect(users.length).toEqual(1);
    expect(users).toEqual(findManyUsers);
  });

  test('should throw error if no users found', async () => {
    (UserRepository.getAllUsers as any).mockResolvedValueOnce([]);

    await expect(UserService.getAll()).rejects.toThrow('No users found');
  });
});

describe('getById', () => {
  let findFirstUser: User;

  beforeEach(() => {
    vi.restoreAllMocks();

    findFirstUser = {
      id: '1',
      name: 'test',
      email: 'test@test.com',
      password: 'test',
      created_at: new Date('01-01-2023'),
    };
  });

  test('should call findFirst with id and select', async () => {
    (UserRepository.getUserById as any).mockResolvedValueOnce(findFirstUser);
    
    await UserService.getById('1');

    expect(UserRepository.getUserById).toHaveBeenCalledWith('1');
  });

  test('should return user', async () => {
    (UserRepository.getUserById as any).mockResolvedValueOnce(findFirstUser);

    const user = await UserService.getById('1');

    expect(user).toEqual(findFirstUser);
  });

  test('should throw error if user not found', async () => {
    (UserRepository.getUserById as any).mockResolvedValueOnce(null);

    await expect(UserService.getById('1')).rejects.toThrow('User not found');
  });
});

describe('edit', () => {
  let findFirstUser: User;
  let editBody: Partial<Omit<User, 'id'>>;
  let file: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    findFirstUser = {
      id: '1',
      name: 'test',
      email: 'test@test.com',
      password: 'test',
      created_at: new Date('01-01-2023'),
    };

    editBody = {
      name: 'test2',
      email: 'test@test.com',
      password: 'test',
    };

    file = {
      filename: 'test.png',
    };
  });

  test('should throw error if user not found', async () => {
    const userId = '1';
    const editBody = { name: 'new name' };

    vi.spyOn(UserService, 'getById').mockResolvedValueOnce(null);

    await expect(UserService.edit(userId, editBody)).rejects.toThrow('User not found');
  });

  test('should throw error if email already in use', async () => {
    const userId = '1';
    const editBody = { email: 'newemail@test.com' };

    const user = { id: userId, name: 'test', email: 'test@test.com', password: 'test' };
    const conflictingUser = { id: '2', name: 'conflict', email: 'newemail@test.com', password: 'conflict' };

    vi.spyOn(UserService, 'getById').mockResolvedValueOnce(user);
    (UserRepository.getUserByEmail as any).mockResolvedValueOnce(conflictingUser);

    await expect(UserService.edit(userId, editBody)).rejects.toThrow('Email already in use');
  });

  test('should call editUser with encrypted password if password is provided', async () => {
    const userId = '1';
    const editBody = { password: 'newpassword' };

    const user = { id: userId, name: 'test', email: 'test@test.com', password: 'test' };
    vi.spyOn(UserService, 'getById').mockResolvedValueOnce(user);
    vi.spyOn(UserService, 'encryptPassword').mockResolvedValueOnce('encrypted-newpassword');
    (UserRepository.editUser as any).mockResolvedValueOnce({ ...user, ...editBody, password: 'encrypted-newpassword' });

    const result = await UserService.edit(userId, editBody);

    expect(UserRepository.editUser).toHaveBeenCalledWith(userId, { password: 'encrypted-newpassword' });
    expect(result).toEqual({ ...user, ...editBody, password: 'encrypted-newpassword' });
  });


});