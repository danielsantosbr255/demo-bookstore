import api from "../api/api";
import type { UserResponse } from "../../@types/user.types";

class UsersService {
  async getAll(): Promise<UserResponse> {
    const response = await api.get("/users");
    return response.data;
  }

  async getById(id: number) {
    const user = await api.get(`/users/${id}`);
    return user.data;
  }
}

export const usersService = new UsersService();
