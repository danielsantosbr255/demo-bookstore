export class User {
  private _id: string;
  private _name!: string;
  private _email!: string;
  private _password!: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  private constructor(id: string, name: string, email: string, password: string) {
    this._id = id;
    this.updateName(name);
    this.updateEmail(email);
    this.updatePassword(password);
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  public static create(id: string, name: string, email: string, password: string): User {
    return new User(id, name, email, password);
  }

  public updateName(newName: string): void {
    if (!newName || newName.length < 3) {
      throw new Error('O nome para atualização é inválido.');
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
