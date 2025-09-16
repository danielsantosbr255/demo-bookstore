export class Product {
  constructor(
    public title: string,
    public description: string,
    public slug: string,
    public price: number,
    public categoryId: number,
    public brandId: number,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
