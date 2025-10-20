import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { SaleDetailEntity } from "./sale-detail.entity";
import { UserEntity } from "../../../users/domain/models/user.entity";

@Entity({ name: "sale" })
export class SaleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
    eager: true,
  })
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @Column({ type: "varchar", length: 100, unique: true })
  saleNumber: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  discount: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  subtotal: number;

  @OneToMany(() => SaleDetailEntity, (detail) => detail.sale, {
    cascade: true,
  })
  details: SaleDetailEntity[];

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
