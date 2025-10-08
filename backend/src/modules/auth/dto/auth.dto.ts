import { IUser } from '@/modules/users/dto/user.dto';

export type SignInDTO = Pick<IUser, 'email' | 'password'>;
export type SignUpDTO = Omit<IUser, 'id'>;
export type SignOutDTO = Pick<IUser, 'id'>;

export class AuthDTO {
  static signUp(data: IUser) {
    return {
      email: data.email,
      name: data.name,
      password: data.password,
    };
  }

  static signIn(data: Pick<IUser, 'email' | 'password'>) {
    return {
      email: data.email,
      password: data.password,
    };
  }

  static signOut(data: Pick<IUser, 'id'>) {
    return { id: data.id };
  }
}
