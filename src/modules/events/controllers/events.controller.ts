import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetAllDto } from 'src/modules/common/dto/getAll.dto';
import { GetOneDto } from 'src/modules/users/DTO/getOneUser.dto';
import { CreateEventDto } from '../DTO/createEvent.dto';
import { DeleteDto } from '../../common/dto/delete.dto';
import { EventDto } from '../DTO/event.dto';
import { EventEntity } from '../entities/event.entity';
import { EventsService } from '../services/events.service';
import { EventParticipantsService } from '../services/eventParticipants.service';
import { ParticipationDto } from '../DTO/participation.dot';
import { RequireRole } from 'src/modules/users/guards/role.guard';
import { Roles } from 'src/modules/users/entities/user.entity';
import { User } from 'src/modules/common/decorators/user.decoratoor';
import { UserFieldDto } from 'src/types/express/userField.dto';
import { AuthGuard } from 'src/modules/users/guards/auth.guard';
import { GetAllEventsByOrgDto } from '../DTO/getAllEventsByOrg.dto';
import { GetByDateDto } from '../DTO/getByDate.dto';
import { GetByNameDto } from 'src/modules/users/DTO/getByName.dto';
import { GetEventByNameDto } from '../DTO/getByName.dto';
import { GetAllEventsDto } from '../DTO/getAllEvnets.dto';

@Controller('events')
export class EventsController {
  @Inject()
  private readonly eventsService: EventsService;

  @Inject()
  private readonly eventParticipantsService: EventParticipantsService;

  // Получить один
  @Get('get-one/:id')
  async getOne(@Param() params: GetOneDto): Promise<EventEntity> {
    return await this.eventsService.findOne(params.id);
  }

  // Получить всё
  @Get('get-all/:skip')
  async getAll(@Param() params: GetAllEventsDto) {
    return await this.eventsService.findAll(params.skip);
  }

  // Получить всё по организатору
  @Get('get-all-by-org/:id/:skip')
  async getAllByOrg(@Param() params: GetAllEventsByOrgDto) {
    return await this.eventsService.findAllByOrg(params.id, params.skip);
  }

  // Получение по дате
  @Get('get-by-date')
  async getByDate(@Query() params: GetByDateDto) {
    return await this.eventsService.findAllByDate(params.date, params.skip);
  }

  // Получить по имени
  @Get('get-by-name')
  async getByName(@Query() params: GetEventByNameDto) {
    return await this.eventsService.findAllByName(params.query, params.skip);
  }

  // Проверить участие
  @Get('check-participation/:eventId')
  @UseGuards(AuthGuard)
  async checkParticipation(
    @User() user: UserFieldDto,
    @Param() params: ParticipationDto,
  ) {
    return await this.eventParticipantsService.checkParticipation(
      params.eventId,
      user.personId,
    );
  }

  // Создать
  @Post('create')
  @UseGuards(AuthGuard)
  @RequireRole(Roles.ORGANIZER)
  async create(@User() user: UserFieldDto, @Body() body: CreateEventDto) {
    await this.eventsService.create(body, user);
  }

  // Поменять
  @Post('change')
  @UseGuards(AuthGuard)
  @RequireRole(Roles.ORGANIZER)
  async change(@User() user: UserFieldDto, @Body() body: EventDto) {
    await this.eventsService.change(body, user);
  }

  // Удалить
  @Post('delete')
  @UseGuards(AuthGuard)
  @RequireRole(Roles.ORGANIZER)
  async delete(@User() user: UserFieldDto, @Body() body: DeleteDto) {
    await this.eventsService.delete(body.id, user);
  }

  // Участвовать
  @Post('participate')
  @UseGuards(AuthGuard)
  async participate(
    @User() user: UserFieldDto,
    @Body() body: ParticipationDto,
  ) {
    await this.eventParticipantsService.participate(
      body.eventId,
      user.personId,
    );
  }

  // Не участвовать
  @Post('not-participate')
  @UseGuards(AuthGuard)
  async notParticipate(
    @User() user: UserFieldDto,
    @Body() body: ParticipationDto,
  ) {
    await this.eventParticipantsService.notParticipate(
      body.eventId,
      user.personId,
    );
  }
}
