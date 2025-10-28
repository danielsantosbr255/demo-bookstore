import { HttpError } from '@/core/errors/HttpError';
import { CreateUserDTO } from '../users/user.dto';
import { User } from '../users/user.entity';
import { UserMapper } from '../users/user.mapper';
import UsersService from '../users/users.service';
import { SignInDTO } from './auth.dto';

export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async signUp(data: CreateUserDTO) {
    const userExists = await this.userService.getByEmail(data.email);
    if (userExists) throw HttpError.Conflict('User already exists!');

    const user = await this.userService.create(data);
    return user;
  }

  async signIn(data: SignInDTO) {
    const existsUser = await this.userService.getByEmail(data.email);
    if (!existsUser) throw HttpError.Unauthorized('Invalid credentials!');

    const user = User.fromDatabase(existsUser);
    const isPasswordValid = await user.password.compare(data.password);

    if (!isPasswordValid) {
      throw HttpError.Unauthorized('Invalid credentials!');
    }

    return UserMapper.toResponse(UserMapper.toDatabase(user));
  }
}
