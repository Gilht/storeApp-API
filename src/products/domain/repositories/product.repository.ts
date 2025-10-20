import { BaseRepository } from "../../../shared/domain/repositories/base-repository";
import { ProductModel } from "../models/product.model";

export interface ProductRepository extends BaseRepository<ProductModel, string> {}
