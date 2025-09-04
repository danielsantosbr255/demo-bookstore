import BaseModel from "../../config/database/baseModel.js";

class UserModel extends BaseModel {
  constructor() {
    super("users", {
      id: "number",
      name: "string",
      email: "string",
      password: "string",
    });
  }
}

export default new UserModel();
