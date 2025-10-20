import Result from "../../shared/application/interfaces/result.interface";
import { BaseApplication } from "../../shared/application/interfaces/base-application";
import { ProductModel } from "../domain/models/product.model";
import { ProductRepository } from "../domain/repositories/product.repository";
import { ProductDTO } from "./dtos/dto";
import { CategoryRepository } from "../../categories/domain/repositories/category.repository";
import { BrandRepository } from "../../brands/domain/repositories/brand.repository";

export class ProductApplication extends BaseApplication<ProductModel> {
  constructor(
    private repositoryProduct: ProductRepository,
    private repositoryCategory: CategoryRepository,
    private repositoryBrand: BrandRepository
  ) {
    super(repositoryProduct, new ProductDTO(), "ProductApplication");
  }

  override async add(entity: ProductModel): Promise<Result<ProductModel>> {
    const existingProduct = await this.repositoryProduct.findOne({ code: entity.code }, []);

    if (existingProduct.payload.data) {
      throw new Error("Product code already exists");
    }

    const category = await this.repositoryCategory.findOne({ id: entity.category }, []);
    if (!category.payload.data) {
      throw new Error("Category not found");
    }

    const brand = await this.repositoryBrand.findOne({ id: entity.brand }, []);
    if (!brand.payload.data) {
      throw new Error("Brand not found");
    }

    const result = await this.repositoryProduct.insert(entity);
    return new ProductDTO().mapping(result);
  }

  override async update(entity: ProductModel, where: any, relations: string[]): Promise<Result<ProductModel>> {
    const existingProduct = await this.repositoryProduct.findOne({ code: entity.code }, []);

    if (existingProduct.payload.data) {
      const existingData = existingProduct.payload.data as any;
      if (existingData.id !== entity.id) {
        throw new Error("Product code already exists");
      }
    }

    const category = await this.repositoryCategory.findOne({ id: entity.category }, []);
    if (!category.payload.data) {
      throw new Error("Category not found");
    }

    const brand = await this.repositoryBrand.findOne({ id: entity.brand }, []);
    if (!brand.payload.data) {
      throw new Error("Brand not found");
    }

    const result = await this.repositoryProduct.update(entity, where, relations);
    return new ProductDTO().mapping(result);
  }

  override async findAll(where: any, relations: string[], options: any): Promise<Result<ProductModel>> {
    const result = await this.repositoryProduct.findAll(where, relations, options);
    return new ProductDTO().mapping(result);
  }

  override async findOne(where: any, relations: string[]): Promise<Result<ProductModel>> {
    const result = await this.repositoryProduct.findOne(where, relations);
    return new ProductDTO().mapping(result);
  }
}
