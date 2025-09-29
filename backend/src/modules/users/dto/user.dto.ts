export type IUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UpdateUserDTO = {
  name?: string;
  email?: string;
};

export type UserResponseDTO = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};
