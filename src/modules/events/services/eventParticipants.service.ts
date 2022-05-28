import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventParticipantEntity } from '../entities/eventParticipant.entity';
import { EventsService } from './events.service';

@Injectable()
export class EventParticipantsService {
  @InjectRepository(EventParticipantEntity)
  private readonly repository: Repository<EventParticipantEntity>;
  @Inject()
  private readonly eventsService: EventsService;

  async participate(eventId: number, personId: number) {
    const event = await this.eventsService.findOne(eventId);

    if (!event) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }

    if (await this.checkParticipation(eventId, personId)) {
      throw new HttpException(
        'You already participate in this event',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.repository.save({
      eventId: eventId,
      personId: personId,
    });

    await this.eventsService.incrementParticipants(eventId);
  }

  async notParticipate(eventId: number, personId: number) {
    const event = await this.eventsService.findOne(eventId);

    if (!event) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }

    if (!(await this.checkParticipation(eventId, personId))) {
      throw new HttpException(
        'You are not participating in this event',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.repository.delete({
      eventId: eventId,
      personId: personId,
    });

    await this.eventsService.decrementParticipants(eventId);
  }

  async checkParticipation(
    eventId: number,
    personId: number,
  ): Promise<Boolean> {
    const event = await this.eventsService.findOne(eventId);

    if (!event) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }

    const isParticipating = await this.repository.findOne({
      where: {
        eventId: eventId,
        personId: personId,
      },
    });

    if (!isParticipating) {
      return false;
    }

    return true;
  }
}
