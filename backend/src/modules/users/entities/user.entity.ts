import { v7 as uuidv7 } from 'uuid';
import { CreateUserDTO } from '../dto/user.dto';

export class User {
  private _id: string;
  private _name!: string;
  private _email!: string;
  private _password!: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  private constructor(
    name: string,
    email: string,
    password: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this._id = id || uuidv7();
    this.updateName(name);
    this.updateEmail(email);
    this.updatePassword(password);
    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt || new Date();
  }

  public static create(data: CreateUserDTO): User {
    const { name, email, password, id, createdAt, updatedAt } = data;
    return new User(name, email, password, id, createdAt, updatedAt);
  }

  public updateName(newName: string): void {
    if (!newName || newName.length < 3) {
      throw new Error('A name for update is invalid.');
    }
    this._name = newName;
    this._updatedAt = new Date();
  }

  public updateEmail(newEmail: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      throw new Error('Invalid email address.');
    }
    this._email = newEmail;
    this._updatedAt = new Date();
  }

  public updatePassword(newPassword: string): void {
    if (!newPassword || newPassword.length < 6) {
      throw new Error('A password for update is invalid.');
    }
    this._password = newPassword;
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
  public get password(): string {
    return this._password;
  }
  public get createdAt(): Date {
    return this._createdAt;
  }
  public get updatedAt(): Date {
    return this._updatedAt;
  }
}
