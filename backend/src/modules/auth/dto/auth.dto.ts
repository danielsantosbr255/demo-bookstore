import { User } from '@/modules/users/entities/user.entity';

export type SignInDTO = Pick<User, 'email' | 'password'>;
export type SignUpDTO = Omit<User, 'id'>;
export type SignOutDTO = Pick<User, 'id'>;

export class AuthDTO {
  static signUp(data: User) {
    return {
      email: data.email,
      name: data.name,
      password: data.password,
    };
  }

  static signIn(data: Pick<User, 'email' | 'password'>) {
    return {
      email: data.email,
      password: data.password,
    };
  }

  static signOut(data: Pick<User, 'id'>) {
    return { id: data.id };
  }
}
