import BaseModel from "../../config/database/baseModel.js";

class CategoryModel extends BaseModel {
  constructor() {
    super("categories", {
      id: "number",
      name: "string",
      slug: "string",
    });
  }
}

export default new CategoryModel();
