import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/common/decorators/user.decoratoor';
import { UserFieldDto } from 'src/types/express/userField.dto';
import { ChangeRoleDto } from '../DTO/chengeRole.dto';
import { GetAllPeopleDto } from '../DTO/getAllPeople.dto';
import { GetByNameDto } from '../DTO/getByName.dto';
import { getOnePersonDto } from '../DTO/getOnePerson.dto';
import { PersonDto } from '../DTO/person.dto';
import { PersonEntity } from '../entities/person.entity';
import { Roles } from '../entities/user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { RequireRole } from '../guards/role.guard';
import { PeopleService } from '../services/people.service';

@Controller('people')
export class PeopleController {
  @Inject()
  private readonly service: PeopleService;

  // Получить однин
  @Get('get-one/:id')
  async getOne(@Param() params: getOnePersonDto) {
    return await this.service.findOne(params.id);
  }

  // Получить все
  @Get('get-all/:skip')
  async getAll(@Param() params: GetAllPeopleDto) {
    return await this.service.findAll(params.skip);
  }

  // Получить по имени
  @Get('get-by-name/:name')
  async getByName(@Param() params: GetByNameDto): Promise<PersonEntity[]> {
    return await this.service.findByName(params.name);
  }

  // Получить по имени организации
  @Get('get-by-org-name/:name')
  async getByOrgName(@Param() params: GetByNameDto): Promise<PersonEntity[]> {
    return await this.service.findByOrgName(params.name);
  }

  // Получить поменять роль
  @Post('change-role')
  @RequireRole(Roles.ADMIN)
  async changeRole(@Body() body: ChangeRoleDto): Promise<void> {
    await this.service.changeRole(body.id, body.role, body.orgName);
  }

  // Получить
  @Post('change')
  @UseGuards(AuthGuard)
  async change(
    @User() user: UserFieldDto,
    @Body() body: PersonDto,
  ): Promise<void> {
    await this.service.change(body, user);
  }
}
