import { SaleModel } from "./sale.model";

export interface ISale {
  id: number;
  user: string;
  saleNumber: string;
  total: number;
  discount: number;
  subtotal: number;
  details: any[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  active: boolean;
}

export class SaleFactory {
  create(sale: Partial<ISale>) {
    const id = sale.id || 0;
    const user = sale.user;
    const saleNumber = sale.saleNumber;
    const total = sale.total || 0;
    const discount = sale.discount || 0;
    const subtotal = sale.subtotal || 0;
    const details = sale.details || null;
    const createdAt = new Date();
    const updatedAt: Date | null = null;
    const deletedAt: Date | null = null;
    const active = sale.active !== undefined ? sale.active : true;

    if (!user) {
      throw new Error("User ID is required");
    }

    if (!saleNumber || saleNumber.trim() === "") {
      throw new Error("Sale number is required");
    }

    if (!details || details.length === 0) {
      throw new Error("Sale must have at least one detail");
    }

    return new SaleModel(
      id,
      user,
      saleNumber.trim(),
      total,
      discount,
      subtotal,
      details,
      createdAt,
      updatedAt,
      deletedAt,
      active
    );
  }
}
