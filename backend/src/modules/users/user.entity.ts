import { Email } from '@/common/value-objects/email.vo';
import { Password } from '@/common/value-objects/password.vo';
import { v7 as uuidv7 } from 'uuid';
import { CreateUserDTO } from './dto/user.dto';

export class User {
  private _id: string;
  private _name!: string;
  private _email!: string;
  private _password!: Password;
  private _createdAt: Date;
  private _updatedAt: Date;

  private constructor(
    name: string,
    email: string,
    password: Password,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this._id = id || uuidv7();
    this.updateName(name);
    this.updateEmail(email);
    this._password = password;
    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt || new Date();
  }

  public static async create(data: CreateUserDTO): Promise<User> {
    const { id, name, email, password, createdAt, updatedAt } = data;

    const passwordHashed = await Password.create(password);

    return new User(name, email, passwordHashed, id, createdAt, updatedAt);
  }

  public updateName(newName: string): void {
    if (!newName || newName.length < 3) {
      throw new Error('Name must be at least 3 characters long.');
    }
    this._name = newName;
    this._updatedAt = new Date();
  }

  public updateEmail(newEmail: string): void {
    this._email = new Email(newEmail).value;
    this._updatedAt = new Date();
  }

  public async updatePassword(newPassword: string): Promise<void> {
    this._password = await Password.create(newPassword);
    this._updatedAt = new Date();
  }

  public get id(): string {
    return this._id;
  }
  public get name(): string {
    return this._name;
  }
  public get email(): string {
    return this._email;
  }
  public get password(): Password {
    return this._password;
  }
  public get createdAt(): Date {
    return this._createdAt;
  }
  public get updatedAt(): Date {
    return this._updatedAt;
  }
}
