import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from '../entities/city.entity';

@Injectable()
export class CitiesService {
  @InjectRepository(CityEntity)
  private readonly repository: Repository<CityEntity>;

  findAll() {
    return this.repository.find();
  }
}
