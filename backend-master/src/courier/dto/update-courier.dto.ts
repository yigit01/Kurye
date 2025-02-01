import {
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  Matches,
  IsBoolean,
} from 'class-validator';

export class UpdateCourierDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least 1 upper case letter, 1 lower case letter, and 1 number or special character',
  })
  password?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]+$/, { message: 'Phone number must contain only numbers' })
  @MinLength(10)
  phone?: string;

  @IsOptional()
  @IsString()
  branchId?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
