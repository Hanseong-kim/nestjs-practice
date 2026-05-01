import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // 1. 회원가입
  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  // 2. 로그인 (간이 구현)
  async login(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (!user || user.password !== createUserDto.password) {
      return { success: false, message: 'Invalid credentials' };
    }
    // 로그인 성공 시 유저 정보를 함께 반환 (나중에 글 쓸 때 ID가 필요함)
    return { success: true, user };
  }

  // 3. 특정 유저 조회 (내가 쓴 글까지 함께 가져옴)
  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ 
      where: { id },
      relations: ['posts'] // 이 유저가 쓴 글들도 같이 불러오기
    });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  // 4. 모든 유저 조회
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  // 5. 유저 삭제 (중요: 삭제 시 CASCADE 설정에 의해 작성한 글도 다 지워짐)
  async remove(id: number): Promise<{ deleted: boolean }> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { deleted: true };
  }
}