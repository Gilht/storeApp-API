import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { CategoryEntity } from "../../../categories/domain/models/category.entity";
import { BrandEntity } from "../../../brands/domain/models/brand.entity";

@Entity({ name: "product" })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200 })
  name: string;

  @Column({ type: "varchar", length: 100, unique: true })
  code: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  salePrice: number;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
    eager: true,
  })
  @JoinColumn({ name: "categoryId" })
  category: CategoryEntity;

  @ManyToOne(() => BrandEntity , (brand) => brand.products, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
    eager: true,
  })
  @JoinColumn({ name: "brandId" })
  brand: BrandEntity;

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
