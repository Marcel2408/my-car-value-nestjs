import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './User.entity';

@Injectable()
export class UsersService {
  // * inject the Repository class made behind the scenes by TypeOrm, passing the Entity that the Repo is gonna deal with
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  createUser(user: CreateUserDto): Promise<User> {
    const userInstance = this.repo.create(user);
    return this.repo.save(userInstance);
  }

  // *returns the first one with the id we pass or null if none
  async findOne(id: number): Promise<User> {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // *find looks for all entity instances that satisfy the param, not just the first: returns [] if none, or User[]
  async find(email: string): Promise<User[]> {
    const users = await this.repo.find({ email }); //{email: email} is the param, but use ES6
    if (!users || users.length === 0) {
      throw new NotFoundException('User not found');
    }
    return users;
  }

  // *Partial allows to pass an object with one of the props of User, or a {}, but not a prop that's not inside User Entity
  async update(id: number, updatedData: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    // const updatedUser = { ...user, ...updatedData }; //works like Object.assign
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updatedData);
    // return this.repo.save(updatedUser);
    return this.repo.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(user);
  }
}
