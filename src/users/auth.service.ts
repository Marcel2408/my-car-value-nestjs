import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async signup(user: CreateUserDto) {
    // 1. check if there's a user with that email
    // 1.1 use the find method to check on users with that email.
    const usersWithThisEmail = await this.usersService.find(user.email);
    // 2. throw error if so
    // 2.1 if users are returned, throw error
    if (usersWithThisEmail && usersWithThisEmail.length > 0) {
      throw new BadRequestException('Email already in use');
    }
    // 3. allow user creation
    // 3.1 if is new user, use the createUser method to create the new user
    console.log('user can be created');
  }
}
