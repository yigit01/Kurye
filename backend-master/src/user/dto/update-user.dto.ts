import {
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  Matches,
  IsBoolean,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]+$/, { message: 'Phone number must contain only numbers' })
  @MinLength(10)
  phone?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  identificationNumber?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
