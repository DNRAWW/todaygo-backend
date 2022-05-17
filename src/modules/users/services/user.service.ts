import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { CreateUserDto } from "../DTO/createUser.dto";
import { UserEntity } from "../entities/user.entity";
import bcrypt from "bcrypt";
import { TokenService } from "./token.service";
import { JwtTokenDto } from "../DTO/jwtToken.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>,
        private readonly tokenService: TokenService
    ) {}

    async findOne(id: number): Promise<UserEntity> {
        const result = await this.repository.findOne(id);

        if (!result) {
            throw new HttpException("Not found", HttpStatus.NOT_FOUND);
        }

        return result;
    }

    async findAll(qSkip: number) {
        const take = 10
        const skip = qSkip;

        const [result, total] = await this.repository.findAndCount(
            {
                take: take,
                skip: skip
            }
        );

        return {
            data: result,
            count: total
        }
    }

    async findByName(name: string): Promise<UserEntity[]> {
        const result = await this.repository.find({
            where: {
                fullName: Like(name),
            },
        });
    
        return result;
    }

    async createUser(user: CreateUserDto): Promise<UserEntity> {
        const encryptedPassword = await bcrypt.hash(user.password, 3);

        const result = await this.repository.save({
            dateOfBirth: user.dateOfBirth,
            firstName: user.firstName,
            lastName: user.lastName,
            surName: user.surName,
            fullName: user.lastName + " " + user.firstName + " " + user.surName,
            login: user.login,
            password: encryptedPassword,
        });
    
        return result;
    }

    async login(login: string, password: string): Promise<string> {
        const candidate = await this.repository.findOne({
            where: {
                login: login,
            },
        });

        if(!candidate) {
            throw new HttpException("Login or password is incorrect", HttpStatus.FORBIDDEN);
        }

        if(bcrypt.compareSync(password, candidate.password)){
            return this.tokenService.genToken(candidate.id);
        }

        throw new HttpException("Login or password is incorrect", HttpStatus.FORBIDDEN);
    }
}