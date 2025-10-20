import { SaleModel } from "../../domain/models/sale.model";
import Result from "../../../shared/application/interfaces/result.interface";
import { DTOAbstract } from "../../../shared/application/interfaces/dtos/abstract.dto";

export class SaleDTO extends DTOAbstract<SaleModel> {
  callback(result: Result<SaleModel>): Result<SaleModel> {
    const data = result.payload.data;

    if (Array.isArray(data)) {
      result.payload.data = data.map((sale: any) => {
        delete sale.deletedAt;
        delete sale.active;

        if (sale.user) {
          delete sale.user.password;
          delete sale.user.refreshToken;
          delete sale.user.deletedAt;
          delete sale.user.active;
        }

        if (sale.details && Array.isArray(sale.details)) {
          sale.details = sale.details.map((detail: any) => {
            delete detail.deletedAt;
            delete detail.active;

            if (detail.product) {
              delete detail.product.deletedAt;
              delete detail.product.active;

              if (detail.product.category) {
                delete detail.product.category.deletedAt;
                delete detail.product.category.active;
              }

              if (detail.product.brand) {
                delete detail.product.brand.deletedAt;
                delete detail.product.brand.active;
              }
            }

            return detail;
          });
        }

        return sale;
      });
    } else {
      const saleModel = result.payload.data as any;
      if (saleModel) {
        delete saleModel.deletedAt;
        delete saleModel.active;

        if (saleModel.user) {
          delete saleModel.user.password;
          delete saleModel.user.refreshToken;
          delete saleModel.user.deletedAt;
          delete saleModel.user.active;
        }

        if (saleModel.details && Array.isArray(saleModel.details)) {
          saleModel.details = saleModel.details.map((detail: any) => {
            delete detail.deletedAt;
            delete detail.active;

            if (detail.product) {
              delete detail.product.deletedAt;
              delete detail.product.active;

              if (detail.product.category) {
                delete detail.product.category.deletedAt;
                delete detail.product.category.active;
              }

              if (detail.product.brand) {
                delete detail.product.brand.deletedAt;
                delete detail.product.brand.active;
              }
            }

            return detail;
          });
        }
      }
    }

    return result;
  }
}
