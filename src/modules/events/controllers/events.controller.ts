import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { GetAllDto } from 'src/modules/common/dto/getAll.dto';
import { GetOneDto } from 'src/modules/users/DTO/getOneUser.dto';
import { CreateEventDto } from '../DTO/createEvent.dto';
import { DeleteDto } from '../../common/dto/delete.dto';
import { EventDto } from '../DTO/event.dto';
import { EventEntity } from '../entities/event.entity';
import { EventsService } from '../services/events.service';
import { EventParticipantsService } from '../services/eventParticipants.service';
import { ParticipationDto } from '../DTO/participation.dot';

@Controller('events')
export class EventsController {
  @Inject()
  private readonly eventsService: EventsService;

  @Inject()
  private readonly eventParticipantsService: EventParticipantsService;

  @Get('get-one/:id')
  async getOne(@Param() params: GetOneDto): Promise<EventEntity> {
    return await this.eventsService.findOne(params.id);
  }

  @Get('get-all/:skip')
  async getAll(@Param() params: GetAllDto) {
    return await this.eventsService.findAll(params.skip);
  }

  @Get('delete/:id')
  async delete(@Param() params: DeleteDto) {
    await this.eventsService.delete(params.id);
  }

  @Get('check-participation/:eventId/:personId')
  async checkParticipation(@Param() params: ParticipationDto) {
    return await this.eventParticipantsService.checkParticipation(
      params.eventId,
      params.personId,
    );
  }

  @Post('create')
  async create(@Body() body: CreateEventDto) {
    await this.eventsService.create(body);
  }

  @Post('change')
  async change(@Body() body: EventDto) {
    await this.eventsService.change(body);
  }

  @Post('participate')
  async participate(@Body() body: ParticipationDto) {
    await this.eventParticipantsService.participate(
      body.eventId,
      body.personId,
    );
  }

  @Post('not-participate')
  async notParticipate(@Body() body: ParticipationDto) {
    await this.eventParticipantsService.notParticipate(
      body.eventId,
      body.personId,
    );
  }
}
