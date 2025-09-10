import BaseModel from '../../config/database/baseModel.js';

class CategoryModel extends BaseModel {
  constructor() {
    super('products', {
      id: 'number',
      title: 'string',
      description: 'string',
      price: 'decimal',
      slug: 'string',
      brandId: 'number',
      categoryId: 'number',
    });
  }
}

export default new CategoryModel();
