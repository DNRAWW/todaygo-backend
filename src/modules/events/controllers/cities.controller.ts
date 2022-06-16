import { Controller, Get, Inject } from '@nestjs/common';
import { CitiesService } from '../services/cities.service';

@Controller('cities')
export class CitiesController {
  @Inject()
  private readonly service: CitiesService;

  @Get('get-all')
  getAll() {
    return this.service.findAll();
  }
}
