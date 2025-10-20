import { CategoryEntity } from "../../../categories/domain/models/category.entity";
import { BrandEntity } from "../../../brands/domain/models/brand.entity";

export class ProductModel {
  constructor(
    public id: number,
    public name: string,
    public code: string,
    public description: string,
    public price: number,
    public salePrice: number | null, 
    public category: number | CategoryEntity | null,
    public brand: number | BrandEntity | null,
    public createdAt: Date,
    public updatedAt: Date | null,
    public deletedAt: Date | null,
    public active: boolean
  ) {}
}
