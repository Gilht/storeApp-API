import { ProductEntity } from "../../../products/domain/models/product.entity";

export class SaleDetailModel {
  constructor(
    public id: number,
    public sale: number | null,
    public product: number | ProductEntity,
    public quantity: number,
    public unitPrice: number,
    public subtotal: number,
    public createdAt: Date,
    public updatedAt: Date | null,
    public deletedAt: Date | null,
    public active: boolean
  ) {}
}
