import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';
import { Shipment } from './entities/shipment.entity';
import { ShipmentHistory } from './entities/shipment-history.entity';
import { User } from '../user/entities/user.entity';
import { Branch } from '../branch/entities/branch.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shipment, ShipmentHistory, User, Branch]),
  ],
  controllers: [ShipmentController],
  providers: [ShipmentService],
  exports: [ShipmentService],
})
export class ShipmentModule {}
