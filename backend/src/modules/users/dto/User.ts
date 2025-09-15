export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}
}

// Schema para validação no banco de dados
export const UserSchema = {
  id: 'number',
  name: 'string',
  email: 'string',
  password: 'string',
};
