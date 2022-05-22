import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EventEntity } from "../entities/event.entity";

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(EventEntity)
        private readonly repository: Repository<EventEntity>
    ) {};
   

    async findOne(id: number): Promise<EventEntity> {
        const result = await this.repository.findOne(id);

        if(!result) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }

        return result;
    };

    async findAll(skip: number) {
        const [result, total] = await this.repository.findAndCount(
            {
                take: 10,
                skip: skip
            }
        );

        return {
            data: result,
            count: total
        }
    }
}