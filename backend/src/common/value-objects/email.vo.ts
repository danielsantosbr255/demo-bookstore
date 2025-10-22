export class Email {
  private constructor(private readonly _value: string) {}

  get value(): string {
    return this._value;
  }

  static create(value: string): Email {
    if (!this.isValid(value)) {
      throw new Error('Email inválido.');
    }

    return new Email(value.toLowerCase().trim());
  }

  static isValid(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  equals(other: Email): boolean {
    return this._value === other._value;
  }
}
