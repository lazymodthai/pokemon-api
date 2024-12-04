import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
  @ApiProperty({
    description: 'Username',
    example: 'example',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    description: 'Password',
    example: 'example',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 'Password at least 8 Characters'
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Password too weak'
  })
  password: string;

  @ApiProperty({
    description: 'Email (Optional)',
    example: 'example@example.con',
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}