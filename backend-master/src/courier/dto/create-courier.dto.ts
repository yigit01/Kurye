import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class CreateCourierDto {
  @IsString()
  @MinLength(2)
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least 1 upper case letter, 1 lower case letter, and 1 number or special character',
  })
  password: string;

  @IsString()
  @Matches(/^[0-9]+$/, { message: 'Phone number must contain only numbers' })
  @MinLength(10)
  phone: string;

  @IsString()
  branchId: string;

  @IsString()
  @MinLength(10)
  identificationNumber: string;
}
