import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChangeRoleDto } from '../DTO/chengeRole.dto';
import { GetAllPeopleDto } from '../DTO/getAllPeople.dto';
import { GetByNameDto } from '../DTO/getByName.dto';
import { getOnePersonDto } from '../DTO/getOnePerson.dto';
import { PersonDto } from '../DTO/person.dto';
import { PersonEntity } from '../entities/person.entity';
import { Roles } from '../entities/user.entity';
import { PeopleService } from '../services/people.service';

@Controller('people')
export class PeopleController {
  @Inject()
  private readonly service: PeopleService;

  @Get('get-one/:id')
  async getOne(@Param() params: getOnePersonDto) {
    return await this.service.findOne(params.id);
  }

  @Get('get-all/:skip')
  async getAll(@Param() params: GetAllPeopleDto) {
    return await this.service.findAll(params.skip);
  }

  @Get('get-by-name/:name')
  async getByName(@Param() params: GetByNameDto): Promise<PersonEntity[]> {
    return await this.service.findByName(params.name);
  }

  @Get('get-by-org-name/:name')
  async getByOrgName(@Param() params: GetByNameDto): Promise<PersonEntity[]> {
    return await this.service.findByOrgName(params.name);
  }

  @Post('change-role')
  async changeRole(@Body() body: ChangeRoleDto): Promise<void> {
    await this.service.changeRole(body.id, body.role, body.orgName);
  }

  @Post('change')
  async change(@Body() body: PersonDto): Promise<void> {
    await this.service.change(body);
  }
}
