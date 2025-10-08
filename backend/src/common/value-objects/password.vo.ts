import argon from 'argon2';

export class Password {
  private constructor(public readonly hashed: string) {}

  static async create(raw: string): Promise<Password> {
    if (raw.length < 6) throw new Error('Password too short');
    const hashed = await argon.hash(raw, { type: argon.argon2id });
    return new Password(hashed);
  }

  static restore(hashed: string): Password {
    return new Password(hashed);
  }

  async compare(raw: string): Promise<boolean> {
    return await argon.verify(raw, this.hashed);
  }
}
