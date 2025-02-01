import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { CourierService } from './courier.service';
import { CreateCourierDto } from './dto/create-courier.dto';
import { UpdateCourierDto } from './dto/update-courier.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/entities/user.entity';

@Controller('couriers')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class CourierController {
  constructor(private readonly courierService: CourierService) {}

  @Post()
  create(@Body(ValidationPipe) createCourierDto: CreateCourierDto) {
    return this.courierService.create(createCourierDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.BRANCH_OPERATOR)
  findAll() {
    return this.courierService.findAll();
  }

  @Get('available')
  @Roles(UserRole.ADMIN, UserRole.BRANCH_OPERATOR)
  findAvailable(@Query('branchId') branchId: string) {
    return this.courierService.findAvailableCouriers(branchId);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.BRANCH_OPERATOR)
  findOne(@Param('id') id: string) {
    return this.courierService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCourierDto: UpdateCourierDto,
  ) {
    return this.courierService.update(id, updateCourierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courierService.remove(id);
  }
}
