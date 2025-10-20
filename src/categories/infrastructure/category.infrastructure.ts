import { BaseInfrastructure } from "../../shared/infrastructure/base-infrastructure";
import { CategoryEntity } from "../domain/models/category.entity";
import { CategoryModel } from "../domain/models/category.model";
import { CategoryRepository } from "../domain/repositories/category.repository";

export class CategoryInfrastructure
  extends BaseInfrastructure<CategoryModel>
  implements CategoryRepository
{
  constructor() {
    super(CategoryEntity, "CategoryInfrastructure");
  }
}
