import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { User, UserRole } from '../user/entities/user.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('shipments')
@UseGuards(JwtAuthGuard)
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.CUSTOMER)
  create(
    @Body(ValidationPipe) createShipmentDto: CreateShipmentDto,
    @GetUser() user: User,
  ) {
    return this.shipmentService.create(createShipmentDto, user.id);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.shipmentService.findAll(user.id, user.role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipmentService.findOne(id);
  }

  @Get('track/:trackingCode')
  findByTrackingCode(@Param('trackingCode') trackingCode: string) {
    return this.shipmentService.findByTrackingCode(trackingCode);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.BRANCH_OPERATOR, UserRole.COURIER)
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateShipmentDto: UpdateShipmentDto,
    @GetUser() user: User,
  ) {
    return this.shipmentService.update(id, updateShipmentDto, user.id);
  }

  @Patch(':id/assign-courier/:courierId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.BRANCH_OPERATOR)
  assignCourier(
    @Param('id') id: string,
    @Param('courierId') courierId: string,
    @GetUser() user: User,
  ) {
    return this.shipmentService.assignCourier(id, courierId, user.id);
  }
}
