import { CategoryModel } from "../../domain/models/category.model";
import Result from "../../../shared/application/interfaces/result.interface";
import { DTOAbstract } from "../../../shared/application/interfaces/dtos/abstract.dto";

export class CategoryDTO extends DTOAbstract<CategoryModel> {
  callback(result: Result<CategoryModel>): Result<CategoryModel> {
    const data = result.payload.data;

    if (Array.isArray(data)) {
      result.payload.data = data.map((category: any) => {
        delete category.deletedAt;
        delete category.active;
        return category;
      });
    } else {
      const categoryModel = result.payload.data as any;
      if (categoryModel) {
        delete categoryModel.deletedAt;
        delete categoryModel.active;
      }
    }

    return result;
  }
}
