import { BaseInfrastructure } from "../../shared/infrastructure/base-infrastructure";
import { BrandEntity } from "../domain/models/brand.entity";
import { BrandModel } from "../domain/models/brand.model";
import { BrandRepository } from "../domain/repositories/brand.repository";

export class BrandInfrastructure
  extends BaseInfrastructure<BrandModel>
  implements BrandRepository
{
  constructor() {
    super(BrandEntity, "BrandInfrastructure");
  }
}
