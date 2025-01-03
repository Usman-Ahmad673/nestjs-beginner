import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'Nathan@yesenia.net',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const filteredUser = this.users.filter((user) => user.role === role);
      if (filteredUser.length === 0)
        throw new NotFoundException(`There is no user with role ${role}`);
      return filteredUser;
    } else {
      return this.users;
    }
  }

  findUserById(id: Number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User not Found with id ${id}`);
    return user;
  }

  createUsers(user: CreateUserDTO) {
    const findHighestUserId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: findHighestUserId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUserById(id: Number, updatedUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
  }

  deleteUserById(id: Number) {
    // const removeUser = this.findUserById(id)
    // this.users.filter(user => user.id !== id)
    const newUsers = [];
    this.users.map((user) => {
      if (user.id !== id) {
        newUsers.push(user);
      }
    });
    this.users = newUsers;
    // return removeUser
  }
}
