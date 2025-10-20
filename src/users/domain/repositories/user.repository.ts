import Result from "../../../shared/application/interfaces/result.interface";
import { BaseRepository } from "../../../shared/domain/repositories/base-repository";
import { UserModel } from "../models/user.model";

export interface UserRepository extends BaseRepository<UserModel, string> {
  findByEmail(email: string): Promise<Result<UserModel>>;
}
