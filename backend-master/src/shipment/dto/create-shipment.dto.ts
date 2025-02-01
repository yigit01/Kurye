import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentType } from '../entities/shipment.entity';

class DimensionsDto {
  @IsNumber()
  weight: number;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsNumber()
  length: number;
}

export class CreateShipmentDto {
  @IsString()
  recipientName: string;

  @IsString()
  recipientPhone: string;

  @IsString()
  recipientAddress: string;

  @IsEnum(PaymentType)
  paymentType: PaymentType;

  @IsNumber()
  amount: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => DimensionsDto)
  dimensions?: DimensionsDto;
}
