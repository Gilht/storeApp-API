import Result from "../../shared/application/interfaces/result.interface";
import { BaseApplication } from "../../shared/application/interfaces/base-application";
import { SaleModel } from "../domain/models/sale.model";
import { SaleRepository } from "../domain/repositories/sale.repository";
import { SaleDTO } from "./dtos/sale.dto";
import { UserRepository } from "../../users/domain/repositories/user.repository";

export class SaleApplication extends BaseApplication<SaleModel> {
  constructor(
    private repositorySale: SaleRepository,
    private repositoryUser: UserRepository
  ) {
    super(repositorySale, new SaleDTO(), "SaleApplication");
  }

  override async add(entity: SaleModel): Promise<Result<SaleModel>> {
    const existingSale = await this.repositorySale.findOne(
      { saleNumber: entity.saleNumber },
      []
    );

    if (existingSale.payload.data) {
      throw new Error("Sale number already exists");
    }

    // Validar que el usuario existe
    const user = await this.repositoryUser.findOne({ email: entity.user }, []);
    if (!user.payload.data) {
      throw new Error("User not found");
    }

    entity.user = user.payload.data as any;

    const result = await this.repositorySale.insert(entity);
    return new SaleDTO().mapping(result);
  }

  override async findAll(
    where: any,
    relations: string[],
    options: any
  ): Promise<Result<SaleModel>> {
    const result = await this.repositorySale.findAll(where, relations, options);
    return new SaleDTO().mapping(result);
  }

  override async findOne(
    where: any,
    relations: string[]
  ): Promise<Result<SaleModel>> {
    const result = await this.repositorySale.findOne(where, relations);
    return new SaleDTO().mapping(result);
  }
}
