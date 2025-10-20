import { SaleDetailModel } from "./sale-detail.model";

export interface ISaleDetail {
  id: number;
  sale: number;
  product: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  active: boolean;
}

export class SaleDetailFactory {
  create(detail: Partial<ISaleDetail>) {
    const id = detail.id || 0;
    const sale = detail.sale || null;
    const product = detail.product;
    const quantity = detail.quantity;
    const unitPrice = detail.unitPrice;
    const subtotal = detail.subtotal || 0;
    const createdAt = new Date();
    const updatedAt: Date | null = null;
    const deletedAt: Date | null = null;
    const active = detail.active !== undefined ? detail.active : true;

    if (!product) {
      throw new Error("Product is required");
    }

    if (!quantity || quantity <= 0) {
      throw new Error("Invalid quantity: must be greater than 0");
    }

    if (!unitPrice || unitPrice <= 0) {
      throw new Error("Invalid unit price: must be greater than 0");
    }

    return new SaleDetailModel(
      id,
      sale,
      product,
      quantity,
      unitPrice,
      subtotal,
      createdAt,
      updatedAt,
      deletedAt,
      active
    );
  }
}
