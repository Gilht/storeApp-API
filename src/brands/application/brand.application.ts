import Result from "../../shared/application/interfaces/result.interface";
import { BaseApplication } from "../../shared/application/interfaces/base-application";
import { BrandModel } from "../domain/models/brand.model";
import { BrandRepository } from "../domain/repositories/brand.repository";
import { BrandDTO } from "./dtos/dto";

export class BrandApplication extends BaseApplication<BrandModel> {
  constructor(private repositoryBrand: BrandRepository) {
    super(repositoryBrand, new BrandDTO(), "BrandApplication");
  }

  override async add(entity: BrandModel): Promise<Result<BrandModel>> {
    const existingBrand = await this.repositoryBrand.findOne({ name: entity.name }, []);

    if (existingBrand.payload.data) {
      throw new Error("Brand name already exists");
    }

    const result = await this.repositoryBrand.insert(entity);
    return new BrandDTO().mapping(result);
  }

  override async update(entity: BrandModel, where: any, relations: string[]): Promise<Result<BrandModel>> {
    const existingBrand = await this.repositoryBrand.findOne({ name: entity.name }, []);

    if (existingBrand.payload.data) {
      const existingData = existingBrand.payload.data as any;
      if (existingData.id !== entity.id) {
        throw new Error("Brand name already exists");
      }
    }

    const result = await this.repositoryBrand.update(entity, where, relations);
    return new BrandDTO().mapping(result);
  }
}
