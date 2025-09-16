import { CustomError } from '@/common/utils/CustomError';
import UserRepository from '../users/users.repository';
import { SignInDTO, SignOutDTO, SignUpDTO } from './dto/auth.dto';

export class AuthService {
  constructor(private readonly repository: UserRepository) {}

  async signUp(data: SignUpDTO) {
    const userExists = await this.repository.findByEmail(data.email);
    if (userExists) throw new CustomError('User already exists!', 409);

    // TODO: Hash password | Argon2?
    return this.repository.create(data);
  }

  async signIn(data: SignInDTO) {
    const user = await this.repository.findByEmail(data.email);

    if (!user || user.password !== data.password) {
      throw new CustomError('Invalid credentials!', 401);
    }

    return user;
  }

  signOut(data: SignOutDTO) {
    return { id: data.id, message: 'User logged out successfuly!' };
  }
}
