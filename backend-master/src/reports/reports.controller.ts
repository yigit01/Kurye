import {
  Controller,
  Get,
  Query,
  UseGuards,
  ParseDatePipe,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/entities/user.entity';

@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.BRANCH_OPERATOR)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('shipments')
  getShipmentStats(
    @Query('startDate', new ParseDatePipe()) startDate: Date,
    @Query('endDate', new ParseDatePipe()) endDate: Date,
  ) {
    return this.reportsService.getShipmentStats(startDate, endDate);
  }

  @Get('couriers')
  getCourierPerformance(
    @Query('startDate', new ParseDatePipe()) startDate: Date,
    @Query('endDate', new ParseDatePipe()) endDate: Date,
  ) {
    return this.reportsService.getCourierPerformance(startDate, endDate);
  }

  @Get('branches')
  getBranchPerformance(
    @Query('startDate', new ParseDatePipe()) startDate: Date,
    @Query('endDate', new ParseDatePipe()) endDate: Date,
  ) {
    return this.reportsService.getBranchPerformance(startDate, endDate);
  }
}
