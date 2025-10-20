import { CategoryModel } from "./category.model";

export interface ICategory {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  active: boolean;
}

export class CategoryFactory {
  create(category: Partial<ICategory>) {
    const id = category.id || 0;
    const name = category.name;
    const createdAt = new Date();
    const updatedAt = new Date();
    const deletedAt = new Date();
    const active = category.active !== undefined ? category.active : true;

    if (!name || name.trim() === "" || name.trim().length < 3) {
      throw new Error("Invalid name: must be at least 3 characters");
    }

    return new CategoryModel(
      id,
      name.trim(),
      createdAt,
      updatedAt,
      deletedAt,
      active
    );
  }
}
