import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;
  
  @IsNumber()
  @IsNotEmpty()
  userId!: number; // 게시물과 유저를 연결하는 키
}