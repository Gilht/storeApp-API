import { BaseInfrastructure } from "../../shared/infrastructure/base-infrastructure";
import { ProductEntity } from "../domain/models/product.entity";
import { ProductModel } from "../domain/models/product.model";
import { ProductRepository } from "../domain/repositories/product.repository";
import DatabaseBootstrap from "../../bootstrap/database.bootstrap";
import Result from "../../shared/application/interfaces/result.interface";
import { ResponseDto } from "../../shared/application/interfaces/dtos/response.dto";
import { Trace } from "../../shared/helpers/trace.helper";

export class ProductInfrastructure
  extends BaseInfrastructure<ProductModel>
  implements ProductRepository
{
  constructor() {
    super(ProductEntity, "ProductInfrastructure");
  }

  override async getPage(
    page: number,
    pageSize: number,
    where: object = {},
    relations: string[] = [],
    order: object = {}
  ): Promise<Result<ProductModel>> {
    const dataSource = DatabaseBootstrap.dataSource;
    const repository = dataSource.getRepository(ProductEntity);

    const queryBuilder = repository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.category", relations[0])
      .leftJoinAndSelect("product.brand", relations[1])
      .where("product.active = :active", { active: true });

    // Si where contiene search, aplicar búsqueda
    const searchTerm = (where as any).search;
    if (searchTerm && searchTerm.trim() !== "") {
      queryBuilder.andWhere(
        "(LOWER(product.name) LIKE LOWER(:search) OR LOWER(product.code) LIKE LOWER(:search) OR LOWER(category.name) LIKE LOWER(:search) OR LOWER(brand.name) LIKE LOWER(:search))",
        { search: `%${searchTerm}%` }
      );
    }

    const [data, total] = await queryBuilder
      .skip(page * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return ResponseDto<ProductModel>(Trace.traceId(), data as any, total);
  }
}
