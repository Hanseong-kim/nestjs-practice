import { IsEnum, IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail() // 이메일 형식 검증
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsEnum(['INTERN', 'ENGINEER'], {
    message: '역할은 INTERN 또는 ENGINEER여야 합니다.',
  })
  role!: string;
}