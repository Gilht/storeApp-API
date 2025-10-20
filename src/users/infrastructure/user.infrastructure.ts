import { Repository } from "typeorm";
import DatabaseBootstrap from "../../bootstrap/database.bootstrap";
import { BaseInfrastructure } from "../../shared/infrastructure/base-infrastructure";
import { UserEntity } from "../domain/models/user.entity";
import { UserModel } from "../domain/models/user.model";
import { UserRepository } from "../domain/repositories/user.repository";
import Result from "../../shared/application/interfaces/result.interface";
import { ResponseDto } from "../../shared/application/interfaces/dtos/response.dto";
import { Trace } from "../../shared/helpers/trace.helper";

export class UserInfrastructure
  extends BaseInfrastructure<UserModel>
  implements UserRepository
{
  constructor() {
    super(UserEntity, "UserInfrastructure");
  }

  async findByEmail(email: string): Promise<Result<UserModel>> {
    const dataSource = DatabaseBootstrap.dataSource;
    const repository: Repository<UserEntity> =
      dataSource.getRepository(UserEntity);
    const result = await repository.findOne({ where: { email } });
    return ResponseDto(Trace.traceId(), result);
  }

  override async getPage(
    page: number,
    pageSize: number,
    where: object = {},
    relations: string[] = [],
    order: object = {}
  ): Promise<Result<UserModel>> {
    const dataSource = DatabaseBootstrap.dataSource;
    const repository = dataSource.getRepository(UserEntity);

    const queryBuilder = repository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.roles", relations[0])
      .where("user.active = :active", { active: true });

    // Si where contiene search, aplicar búsqueda
    const searchTerm = (where as any).search;
    if (searchTerm && searchTerm.trim() !== "") {
      queryBuilder.andWhere(
        "(user.name LIKE :search OR user.email LIKE :search OR role.name LIKE :search)",
        { search: `%${searchTerm}%` }
      );
    }

    const [data, total] = await queryBuilder
      .skip(page * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return ResponseDto<UserModel>(Trace.traceId(), data as any, total);
  }
}
