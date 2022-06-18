import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { endOfDay, startOfDay } from 'date-fns';
import { Roles } from 'src/modules/users/entities/user.entity';
import { UserFieldDto } from 'src/types/express/userField.dto';
import { Between, ILike, LessThanOrEqual, Repository } from 'typeorm';
import { CreateEventDto } from '../DTO/createEvent.dto';
import { EventDto } from '../DTO/event.dto';
import { EventEntity } from '../entities/event.entity';

@Injectable()
export class EventsService {
  @InjectRepository(EventEntity)
  private readonly repository: Repository<EventEntity>;

  async findOne(id: number): Promise<EventEntity> {
    const result = await this.repository.findOne(id, {
      relations: ['city', 'attachment'],
    });

    if (!result) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async findAll(skip: number, cityId: number) {
    const [result, total] = await this.repository.findAndCount({
      take: 10,
      skip: skip,
      order: {
        date: 'ASC',
      },
      where: {
        cityId: cityId,
      },
      relations: ['attachment'],
    });

    return {
      data: result,
      count: total,
    };
  }

  async findAllByOrg(id: number, skip: number) {
    const [result, total] = await this.repository.findAndCount({
      take: 10,
      skip: skip,
      where: {
        organizerId: id,
      },
      relations: ['city', 'attachment'],
    });

    return {
      data: result,
      count: total,
    };
  }

  async create(event: CreateEventDto, user: UserFieldDto) {
    await this.repository.delete({
      date: LessThanOrEqual(new Date()),
    });

    await this.repository.save({
      address: event.address,
      date: event.date,
      description: event.description,
      duration: event.duration,
      maxNumberOfParticipants: event.maxNumberOfParticipants,
      name: event.name,
      organizerId: user.personId,
      price: event.price,
      tags: [...event.tags],
      cityId: event.cityId,
      attachmentId: event.attachmentId,
    });
  }

  async change(event: EventDto, user: UserFieldDto) {
    const eventById = await this.repository.findOne(event.id);

    if (!eventById) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }

    if (eventById.organizerId !== user.personId && user.role !== Roles.ADMIN) {
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }

    await this.repository.save(event);
  }

  async delete(id: number, user: UserFieldDto) {
    const eventById = await this.repository.findOne(id);

    if (!eventById) {
      return;
    }

    if (eventById.organizerId !== user.personId && user.role !== Roles.ADMIN) {
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }

    await this.repository.delete(id);
  }

  async incrementParticipants(id: number) {
    await this.repository.increment({ id }, 'numberOfParticipants', 1);
  }

  async decrementParticipants(id: number) {
    await this.repository.decrement({ id }, 'numberOfParticipants', 1);
  }

  async findAllByDate(date: string, skip: number, cityId: number) {
    const [result, total] = await this.repository.findAndCount({
      take: 10,
      skip: skip,
      where: {
        date: Between(startOfDay(new Date(date)), endOfDay(new Date(date))),
        cityId: cityId,
      },
      relations: ['attachment'],
    });

    return {
      data: result,
      count: total,
    };
  }

  async findAllByName(name: string, skip: number, cityId: number) {
    const [result, total] = await this.repository.findAndCount({
      take: 10,
      skip: skip,
      where: {
        name: ILike(`%${name}%`),
        cityId: cityId,
      },
      relations: ['attachment'],
    });

    return {
      data: result,
      count: total,
    };
  }
}
