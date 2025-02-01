import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { Branch } from './entities/branch.entity';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Branch]), UserModule],
  controllers: [BranchController],
  providers: [BranchService],
  exports: [BranchService, TypeOrmModule],
})
export class BranchModule {}
