import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Shipment, ShipmentStatus } from './shipment.entity';
import { User } from '../../user/entities/user.entity';

@Entity('shipment_history')
export class ShipmentHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Shipment, (shipment) => shipment.history)
  shipment: Shipment;

  @Column({
    type: 'varchar',
  })
  status: ShipmentStatus;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User)
  updatedBy: User;

  @CreateDateColumn()
  createdAt: Date;
}
