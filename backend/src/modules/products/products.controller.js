import ProductsService from "./products.service.js";

export default class ProductsController {
  /** @param {ProductsService} service */
  constructor(service) {
    this.service = service;
  }

  create = async (req, res) => {
    const data = req.body;

    if (!data.title || !data.price || !data.description || !data.categoryId) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const product = await this.service.create(data);
    res.status(201).json({ message: "Product created successfuly!", data: product });
  };

  getAll = async (req, res) => {
    const products = await this.service.getAll();
    res.json({ message: "All Products", data: products });
  };

  getOne = async (req, res) => {
    const { id } = req.params;
    const product = await this.service.getOne(id);
    res.json({ message: "Product", data: product });
  };

  update = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const product = await this.service.update(id, data);
    res.json({ message: "Product updated successfuly!", data: product });
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const product = await this.service.delete(id);
    res.json({ message: "Product deleted successfuly!", data: product });
  };
}
