import Result from "../../shared/application/interfaces/result.interface";
import { BaseApplication } from "../../shared/application/interfaces/base-application";
import { CategoryModel } from "../domain/models/category.model";
import { CategoryRepository } from "../domain/repositories/category.repository";
import { CategoryDTO } from "./dtos/dto";

export class CategoryApplication extends BaseApplication<CategoryModel> {
  constructor(private repositoryCategory: CategoryRepository) {
    super(repositoryCategory, new CategoryDTO(), "CategoryApplication");
  }

  override async add(entity: CategoryModel): Promise<Result<CategoryModel>> {
    // Validar que el name sea único
    const existingCategory = await this.repositoryCategory.findOne({ name: entity.name }, []);

    if (existingCategory.payload.data) {
      throw new Error("Category name already exists");
    }

    const result = await this.repositoryCategory.insert(entity);
    return new CategoryDTO().mapping(result);
  }

  override async update(entity: CategoryModel, where: any, relations: string[]): Promise<Result<CategoryModel>> {
    // Validar que el name sea único (excluyendo el mismo registro)
    const existingCategory = await this.repositoryCategory.findOne({ name: entity.name }, []);

    if (existingCategory.payload.data) {
      const existingData = existingCategory.payload.data as any;
      if (existingData.id !== entity.id) {
        throw new Error("Category name already exists");
      }
    }

    const result = await this.repositoryCategory.update(entity, where, relations);
    return new CategoryDTO().mapping(result);
  }
}
