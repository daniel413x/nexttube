import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CommentDto } from './comment.dto';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async create(id: string, dto: CommentDto) {
    const newComment = this.commentRepository.create({
      ...dto,
      userId: id,
    });
    await this.commentRepository.save(newComment);
    const comment = await this.commentRepository.findOne({
      where: {
        id: newComment.id,
      },
      relations: {
        user: true,
        video: true,
      },
    });
    return comment;
  }
}
