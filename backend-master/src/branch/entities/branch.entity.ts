import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Shipment } from '../../shipment/entities/shipment.entity';

@Entity('branches')
export class Branch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({ type: 'point', nullable: true })
  location: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => User, (user) => user.branchId)
  staff: User[];

  @OneToMany(() => Shipment, (shipment) => shipment.currentBranch)
  shipments: Shipment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
