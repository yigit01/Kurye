import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Branch } from '../../branch/entities/branch.entity';
import { ShipmentHistory } from './shipment-history.entity';

export enum ShipmentStatus {
  CREATED = 'created',
  COURIER_ASSIGNED = 'courier_assigned',
  PICKED_UP = 'picked_up',
  IN_BRANCH = 'in_branch',
  IN_TRANSIT = 'in_transit',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  FAILED = 'failed',
}

export enum PaymentType {
  CASH = 'cash',
  CREDIT_CARD = 'credit_card',
  BANK_TRANSFER = 'bank_transfer',
}

@Entity('shipments')
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  trackingCode: string;

  @ManyToOne(() => User, (user) => user.shipments)
  sender: User;

  @Column()
  recipientName: string;

  @Column()
  recipientPhone: string;

  @Column()
  recipientAddress: string;

  @Column({
    type: 'varchar',
    default: ShipmentStatus.CREATED,
  })
  status: ShipmentStatus;

  @Column({
    type: 'varchar',
  })
  paymentType: PaymentType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => Branch, (branch) => branch.shipments)
  currentBranch: Branch;

  @ManyToOne(() => User, (user) => user.assignedShipments, { nullable: true })
  assignedCourier: User;

  @Column({ type: 'jsonb', nullable: true })
  dimensions: {
    weight: number;
    width: number;
    height: number;
    length: number;
  };

  @OneToMany(() => ShipmentHistory, (history) => history.shipment)
  history: ShipmentHistory[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
