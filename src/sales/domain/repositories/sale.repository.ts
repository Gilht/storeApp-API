import { BaseRepository } from "../../../shared/domain/repositories/base-repository";
import { SaleModel } from "../models/sale.model";

export interface SaleRepository extends BaseRepository<SaleModel, string> {}
