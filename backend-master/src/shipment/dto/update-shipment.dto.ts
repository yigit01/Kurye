import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ShipmentStatus } from '../entities/shipment.entity';

export class UpdateShipmentDto {
  @IsOptional()
  @IsEnum(ShipmentStatus)
  status?: ShipmentStatus;

  @IsOptional()
  @IsString()
  statusDescription?: string;

  @IsOptional()
  @IsString()
  currentBranchId?: string;
}
