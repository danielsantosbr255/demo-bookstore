import User from "../../models/User.js";
import Product from "../../models/Product.js";
import Category from "../../models/Category.js";
import Brand from "../../models/Brand.js";

async function generate() {
  await User.createTable();
  await Brand.createTable();
  await Category.createTable();
  await Product.createTable();
}

generate();
