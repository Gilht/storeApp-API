import { ProductModel } from "../../domain/models/product.model";
import Result from "../../../shared/application/interfaces/result.interface";
import { DTOAbstract } from "../../../shared/application/interfaces/dtos/abstract.dto";

export class ProductDTO extends DTOAbstract<ProductModel> {
  callback(result: Result<ProductModel>): Result<ProductModel> {
    const data = result.payload.data;

    if (Array.isArray(data)) {
      result.payload.data = data.map((product: any) => {
        delete product.deletedAt;
        delete product.active;

        if (product.category) {
          delete product.category.deletedAt;
          delete product.category.active;
        }

        if (product.brand) {
          delete product.brand.deletedAt;
          delete product.brand.active;
        }

        return product;
      });
    } else {
      const productModel = result.payload.data as any;
      if (productModel) {
        delete productModel.deletedAt;
        delete productModel.active;

        if (productModel.category) {
          delete productModel.category.deletedAt;
          delete productModel.category.active;
        }

        if (productModel.brand) {
          delete productModel.brand.deletedAt;
          delete productModel.brand.active;
        }
      }
    }

    return result;
  }
}
