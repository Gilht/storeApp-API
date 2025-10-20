import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { ProductEntity } from "../../../products/domain/models/product.entity";

@Entity({ name: "category" })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, unique: true })
  name: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true, onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date;

  @Column({ type: "boolean", default: true })
  active: boolean;

  @OneToMany(() => ProductEntity, (sub) => sub.category)
  products: ProductEntity[];
}
