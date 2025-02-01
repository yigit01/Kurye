import { IsUUID, IsString, IsOptional } from 'class-validator';

export class TransferShipmentDto {
  @IsUUID()
  targetBranchId: string;

  @IsString()
  @IsOptional()
  transferNote?: string;
}
