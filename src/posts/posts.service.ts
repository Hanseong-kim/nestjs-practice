import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  // 1. 게시물 생성 (작성자 ID를 함께 받아야 함)
  async create(createPostDto: CreatePostDto, userId: number) {
    const post = this.postsRepository.create({
      ...createPostDto,
      user: { id: userId } as any, // 글과 유저를 연결!
    });
    return await this.postsRepository.save(post);
  }

  // 2. 모든 글 조회 (작성자 정보 포함)
  findAll() {
    return this.postsRepository.find({ relations: ['user'] });
  }

  // 3. 특정 유저가 쓴 글들만 조회 (Get My Posts)
  async findByUserId(userId: number) {
    return await this.postsRepository.find({
      where: { user: { id: userId } },
    });
  }

  // 4. 글 수정
  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.postsRepository.update(id, updatePostDto);
    return this.postsRepository.findOneBy({ id });
  }

  // 5. 글 하나 삭제
  async remove(id: number) {
    return await this.postsRepository.delete(id);
  }

  // 6. 내 모든 글 삭제 (Delete All My Posts)
  async removeAllByUserId(userId: number) {
    return await this.postsRepository.delete({ user: { id: userId } });
  }
}