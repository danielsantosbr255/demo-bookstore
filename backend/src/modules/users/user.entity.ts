import { Email } from '@/common/value-objects/email.vo';
import { Password } from '@/common/value-objects/password.vo';
import { v7 as uuidv7 } from 'uuid';
import { CreateUserDTO, IUser } from './dto/user.dto';

export class User {
  private constructor(
    public readonly id: string,
    private _name: string,
    private _email: Email,
    private _password: Password,
    private _createdAt: Date,
    private _updatedAt: Date
  ) {}

  public updateName(newName: string): void {
    if (!User.isValidName(newName)) {
      throw new Error('Name must be at least 3 characters long.');
    }
    this._name = newName;
    this._updatedAt = new Date();
  }

  public updateEmail(newEmail: string): void {
    this._email = Email.create(newEmail);
    this._updatedAt = new Date();
  }

  public async updatePassword(newPassword: string): Promise<void> {
    this._password = await Password.create(newPassword);
    this._updatedAt = new Date();
  }

  public static async create(data: CreateUserDTO): Promise<User> {
    const { name, email, password } = data;

    if (!User.isValidName(name)) throw new Error('Name must be at least 3 characters long.');

    const id = data.id || uuidv7();
    const createdAt = new Date();
    const updatedAt = new Date();
    const hashed = await Password.create(password);
    const emailVO = Email.create(email);

    return new User(id, name, emailVO, hashed, createdAt, updatedAt);
  }

  public static fromDatabase(data: IUser): User {
    const { id, name, email, password, createdAt, updatedAt } = data;
    return new User(id, name, Email.create(email), Password.restore(password), createdAt, updatedAt);
  }

  private static isValidName(name: string): boolean {
    return typeof name === 'string' && name.trim().length >= 3;
  }

  public get name(): string {
    return this._name;
  }
  public get email(): Email {
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
