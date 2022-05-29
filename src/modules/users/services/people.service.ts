import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFieldDto } from 'src/types/express/userField.dto';
import { Like, Repository } from 'typeorm';
import { PersonDto } from '../DTO/person.dto';
import { PersonEntity } from '../entities/person.entity';
import { Roles } from '../entities/user.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly repository: Repository<PersonEntity>,
  ) {}

  async findOne(id: number) {
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

  async changeRole(id: number, role: Roles, orgName: string | null) {
    const person = await this.repository.findOne(id);

    if (!person) {
      throw new HttpException('Person not found', HttpStatus.NOT_FOUND);
    }

    if (!orgName) {
      this.repository.save({
        id: person.id,
        role: role,
      });

      return;
    }

    this.repository.save({
      id: person.id,
      role: role,
      orgName: orgName,
    });
  }

  async findByName(name: string): Promise<PersonEntity[]> {
    const result = await this.repository.find({
      where: {
        fullName: Like(name),
      },
    });

    return result;
  }

  async findByOrgName(name: string): Promise<PersonEntity[]> {
    const result = await this.repository.find({
      where: {
        orgName: Like(name),
      },
    });

    return result;
  }

  async change(person: PersonDto, user: UserFieldDto) {
    const personById = await this.repository.findOne(person.id);

    if (!personById) {
      throw new HttpException('Person not found', HttpStatus.NOT_FOUND);
    }

    if (person.id !== user.personId && user.role !== Roles.ADMIN) {
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }

    await this.repository.save(person);
  }
}
