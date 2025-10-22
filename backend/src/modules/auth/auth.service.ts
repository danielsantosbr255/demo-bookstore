import { CustomError } from '@/common/utils/CustomError';
import { CreateUserDTO } from '../users/dto/user.dto';
import { User } from '../users/user.entity';
import { UserMapper } from '../users/user.mapper';
import UsersService from '../users/users.service';
import { SignInDTO, SignOutDTO } from './dto/auth.dto';

export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async signUp(data: CreateUserDTO) {
    const userExists = await this.userService.getByEmail(data.email);
    if (userExists) throw new CustomError('User already exists!', 409);

    const user = await this.userService.create(data);
    return user;
  }

  async signIn(data: SignInDTO) {
    const existsUser = await this.userService.getByEmail(data.email);
    if (!existsUser) throw new CustomError('Invalid credentials!', 401);

    const user = User.fromDatabase(existsUser);
    const isPasswordValid = await user.password.compare(data.password);

    if (!isPasswordValid) {
      throw new CustomError('Invalid credentials!', 401);
    }

    return UserMapper.toResponse(UserMapper.toDatabase(user));
  }

  signOut(data: SignOutDTO) {
    return { id: data.id, message: 'User logged out successfuly!' };
  }
}
