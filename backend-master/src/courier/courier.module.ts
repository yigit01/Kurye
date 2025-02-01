import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourierService } from './courier.service';
import { CourierController } from './courier.controller';
import { User } from '../user/entities/user.entity';
import { Branch } from '../branch/entities/branch.entity';
import { UserModule } from '../user/user.module';
import { BranchModule } from '../branch/branch.module';

@Module({
  imports: [UserModule, BranchModule],
  controllers: [CourierController],
  providers: [CourierService],
  exports: [CourierService],
})
export class CourierModule {}
