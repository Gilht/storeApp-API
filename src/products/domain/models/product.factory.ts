import { ProductModel } from "./product.model";

export interface IProduct {
  id: number;
  name: string;
  code: string;
  description: string;
  price: number;
  salePrice: number;
  category: number;
  brand: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  active: boolean;
  imgUrl: string | null;
}

export class ProductFactory {
  create(product: Partial<IProduct>) {
    const id = product.id || 0;
    const name = product.name;
    const code = product.code;
    const description = product.description || "";
    const price = product.price;
    const salePrice = product.salePrice || null;
    const categoryId = product.category;
    const brand = product.brand;
    const createdAt = new Date();
    const updatedAt = new Date();
    const deletedAt = new Date();
    const active = product.active !== undefined ? product.active : true;
    const imgUrl = product.imgUrl;
    if (!name || name.trim() === "" || name.trim().length < 3) {
      throw new Error("Invalid name: must be at least 3 characters");
    }

    if (!code || code.trim() === "") {
      throw new Error("Code is required");
    }

    if (!price || price <= 0) {
      throw new Error("Invalid price: must be greater than 0");
    }

    if (!categoryId) {
      throw new Error("Category is required");
    }

    if (!brand) {
      throw new Error("Brand is required");
    }

    return new ProductModel(
      id,
      name.trim(),
      code.trim(),
      description.trim(),
      price,
      salePrice,
      categoryId,
      brand,
      createdAt,
      updatedAt,
      deletedAt,
      active,
        imgUrl,
    );
  }
}
