import { SaleDetailModel } from "./sale-detail.model";
import { UserEntity } from "../../../users/domain/models/user.entity";

export class SaleModel {
  constructor(
    public id: number,
    public user: string | number | UserEntity,
    public saleNumber: string,
    public total: number,
    public discount: number,
    public subtotal: number,
    public details: SaleDetailModel[] | null,
    public createdAt: Date,
    public updatedAt: Date | null,
    public deletedAt: Date | null,
    public active: boolean
  ) {}
}
