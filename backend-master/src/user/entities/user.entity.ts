import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Shipment } from '../../shipment/entities/shipment.entity';
import { Branch } from '../../branch/entities/branch.entity';

export enum UserRole {
  ADMIN = 'admin',
  BRANCH_OPERATOR = 'branch_operator',
  COURIER = 'courier',
  CUSTOMER = 'customer',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  identificationNumber: string; // TC/Vergi No

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @ManyToOne(() => Branch, (branch) => branch.staff)
  branch: Branch;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Shipment, (shipment) => shipment.sender)
  shipments: Shipment[];

  @OneToMany(() => Shipment, (shipment) => shipment.assignedCourier)
  assignedShipments: Shipment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
