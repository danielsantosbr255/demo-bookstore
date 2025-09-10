import BaseModel from '../../config/database/baseModel.js';

class BrandModel extends BaseModel {
  constructor() {
    super('brands', { id: 'number', name: 'string', slug: 'string' });
  }
}

export default new BrandModel();
