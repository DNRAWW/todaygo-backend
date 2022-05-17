import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { CreateUserDto } from "../DTO/createUser.dto";
import { GetAllDto } from "../DTO/getAll.dto";
import { GetAllResponseDto } from "../DTO/getAllResponse.dto";
import { GetByNameDto } from "../DTO/getByName.dto";
import { GetOneDto } from "../DTO/getOne.dto";
import { LoginDto } from "../DTO/login.dto";
import { UserEntity } from "../entities/user.entity";
import { UserService } from "../services/user.service";

@Controller("users")
export class UserController {
    constructor(
        private service: UserService
    ){}

    @Get("getOne/:id")
    async getOne(@Param() params: GetOneDto): Promise<UserEntity> {
        return await this.service.findOne(params.id);
    }

    @Get("getAll/:skip")
    async getAll(@Param() params: GetAllDto): Promise<GetAllResponseDto> {
        return await this.service.findAll(params.skip);
    }

    @Get("getAll/:skip")
    async getByName(@Param() params: GetByNameDto): Promise<UserEntity[]> {
        return await this.service.findByName(params.name);
    }

    @Post()
    async createUser(@Body() body: CreateUserDto): Promise<UserEntity> {
        return await this.service.createUser(body);
    }

    @Post()
    async login(@Body() body: LoginDto, @Res({passthrough: true}) res): Promise<void> {
        const token = await this.service.login(body.login, body.password);

        res.cookie('token', token);
    }
}