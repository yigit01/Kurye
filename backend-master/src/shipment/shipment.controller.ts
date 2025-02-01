import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  ValidationPipe,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { TransferShipmentDto } from './dto/transfer-shipment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { User, UserRole } from '../user/entities/user.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Shipment } from './entities/shipment.entity';

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
  findAll(
    @GetUser() user: User,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Shipment>> {
    return this.shipmentService.findAll(user.id, user.role, {
      page,
      limit,
      route: '/shipments',
    });
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

  @Patch(':id/transfer')
  @UseGuards(RolesGuard)
  @Roles(UserRole.BRANCH_OPERATOR)
  transferToBranch(
    @Param('id') id: string,
    @Body(ValidationPipe) transferShipmentDto: TransferShipmentDto,
    @GetUser() user: User,
  ) {
    return this.shipmentService.transferToBranch(
      id,
      transferShipmentDto,
      user.id,
    );
  }
}
