import { UserProps } from '@/modules/users/dto/User';

export type SignInDTO = Pick<UserProps, 'email' | 'password'>;
export type SignUpDTO = Omit<UserProps, 'id'>;
export type SignOutDTO = Pick<UserProps, 'id'>;

export class AuthDTO {
  static signUp(data: UserProps) {
    return {
      email: data.email,
      name: data.name,
      password: data.password,
    };
  }

  static signIn(data: Pick<UserProps, 'email' | 'password'>) {
    return {
      email: data.email,
      password: data.password,
    };
  }

  static signOut(data: Pick<UserProps, 'id'>) {
    return { id: data.id };
  }
}
