import { BaseRepository } from "../../../shared/domain/repositories/base-repository";
import { CategoryModel } from "../models/category.model";

export interface CategoryRepository extends BaseRepository<CategoryModel, string> {}
