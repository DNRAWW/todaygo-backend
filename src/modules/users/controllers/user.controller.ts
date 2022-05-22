import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { CreateUserDto } from "../DTO/createUser.dto";
import { GetAllDto } from "../DTO/getAllUsers.dto";
import { GetAllResponseDto } from "../DTO/getAllResponse.dto";
import { GetByNameDto } from "../DTO/getByName.dto";
import { GetOneDto } from "../DTO/getOneUser.dto";
import { LoginDto } from "../DTO/login.dto";
import { UserEntity } from "../entities/user.entity";
import { UsersService } from "../services/users.service";

@Controller("users")
export class UsersController {
    constructor(
        private service: UsersService
    ){}

    @Get("getOne/:id")
    async getOne(@Param() params: GetOneDto): Promise<UserEntity> {
        return await this.service.findOne(params.id);
    }

    @Get("getAll/:skip")
    async getAll(@Param() params: GetAllDto): Promise<GetAllResponseDto> {
        return await this.service.findAll(params.skip);
    }

    @Post("register")
    async createUser(@Body() body: CreateUserDto): Promise<UserEntity> {
        return await this.service.createUser(body);
    }

    @Post("login")
    async login(@Body() body: LoginDto, @Res({passthrough: true}) res): Promise<void> {
        const token = await this.service.login(body.login, body.password);

        res.cookie('token', token);
    }
}