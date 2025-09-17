export interface UserProps {
  id: number;
  name: string;
  email: string;
  password: string;
}

export type UserCreateProps = Omit<UserProps, 'id'>;
export type UserUpdateProps = Partial<Omit<UserProps, 'id'>>;

export class User {
  private static idCounter = 1;

  static create(name: string, email: string, password: string): UserProps {
    return { id: this.idCounter++, name, email, password };
  }

  static update(data: UserUpdateProps): UserUpdateProps {
    const updatedData: UserUpdateProps = {};
    if (data.name !== undefined) updatedData.name = data.name;
    if (data.email !== undefined) updatedData.email = data.email;
    if (data.password !== undefined) updatedData.password = data.password;
    return updatedData;
  }
}
