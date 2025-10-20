import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { SaleEntity } from "./sale.entity";
import { ProductEntity } from "../../../products/domain/models/product.entity";

@Entity({ name: "sale_detail" })
export class SaleDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SaleEntity, (sale) => sale.details, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "saleId" })
  sale: SaleEntity;

  @ManyToOne(() => ProductEntity, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
    eager: true,
  })
  @JoinColumn({ name: "productId" })
  product: ProductEntity;

  @Column({ type: "int" })
  quantity: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  subtotal: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({
    type: "timestamp",
    nullable: true,
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date;

  @Column({ type: "boolean", default: true })
  active: boolean;
}
