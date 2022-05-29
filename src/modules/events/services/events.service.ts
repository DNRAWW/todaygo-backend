import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { CreateEventDto } from '../DTO/createEvent.dto';
import { EventDto } from '../DTO/event.dto';
import { EventEntity } from '../entities/event.entity';

@Injectable()
export class EventsService {
  @InjectRepository(EventEntity)
  private readonly repository: Repository<EventEntity>;

  async findOne(id: number): Promise<EventEntity> {
    const result = await this.repository.findOne(id);

    if (!result) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async findAll(skip: number) {
    const [result, total] = await this.repository.findAndCount({
      take: 10,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  async create(event: CreateEventDto) {
    // if(personRole === Roles.REGULAR_USER) {
    //     throw new HttpException("Not allowed", HttpStatus.UNAUTHORIZED);
    // }

    await this.repository.delete({
      date: LessThanOrEqual(new Date()),
    });

    await this.repository.save(event);
  }

  async change(event: EventDto) {
    await this.repository.save(event);
  }

  async delete(id: number) {
    await this.repository.delete(id);
  }

  async incrementParticipants(id: number) {
    await this.repository.increment({ id }, 'numberOfParticipants', 1);
  }

  async decrementParticipants(id: number) {
    await this.repository.decrement({ id }, 'numberOfParticipants', 1);
  }
}
