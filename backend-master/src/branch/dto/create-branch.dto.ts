import { IsString, IsOptional } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  location?: string;
}
