import { BrandModel } from "../../domain/models/brand.model";
import Result from "../../../shared/application/interfaces/result.interface";
import { DTOAbstract } from "../../../shared/application/interfaces/dtos/abstract.dto";

export class BrandDTO extends DTOAbstract<BrandModel> {
  callback(result: Result<BrandModel>): Result<BrandModel> {
    const data = result.payload.data;

    if (Array.isArray(data)) {
      result.payload.data = data.map((brand: any) => {
        delete brand.deletedAt;
        delete brand.active;
        return brand;
      });
    } else {
      const brandModel = result.payload.data as any;
      if (brandModel) {
        delete brandModel.deletedAt;
        delete brandModel.active;
      }
    }

    return result;
  }
}
