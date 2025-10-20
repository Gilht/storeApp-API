import { BrandModel } from "./brand.model";

export interface IBrand {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  active: boolean;
}

export class BrandFactory {
  create(brand: Partial<IBrand>) {
    const id = brand.id || 0;
    const name = brand.name;
    const createdAt = new Date();
    const updatedAt = new Date();
    const deletedAt = new Date();
    const active = brand.active !== undefined ? brand.active : true;

    if (!name || name.trim() === "" || name.trim().length < 3) {
      throw new Error("Invalid name: must be at least 3 characters");
    }

    return new BrandModel(
      id,
      name.trim(),
      createdAt,
      updatedAt,
      deletedAt,
      active
    );
  }
}
