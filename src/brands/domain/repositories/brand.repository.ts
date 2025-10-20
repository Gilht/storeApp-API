import { BaseRepository } from "../../../shared/domain/repositories/base-repository";
import { BrandModel } from "../models/brand.model";

export interface BrandRepository extends BaseRepository<BrandModel, string> {}
