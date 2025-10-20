import { BaseInfrastructure } from "../../shared/infrastructure/base-infrastructure";
import { SaleEntity } from "../domain/models/sale.entity";
import { SaleModel } from "../domain/models/sale.model";
import { SaleRepository } from "../domain/repositories/sale.repository";

export class SaleInfrastructure
  extends BaseInfrastructure<SaleModel>
  implements SaleRepository
{
  constructor() {
    super(SaleEntity, "SaleInfrastructure");
  }
}
