import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from '../DTO/createUser.dto';
import { GetAllDto } from '../DTO/getAllUsers.dto';
import { GetAllResponseDto } from '../DTO/getAllResponse.dto';
import { GetByNameDto } from '../DTO/getByName.dto';
import { GetOneDto } from '../DTO/getOneUser.dto';
import { LoginDto } from '../DTO/login.dto';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { UserDto } from '../DTO/user.dto';
import { DeleteDto } from 'src/modules/common/dto/delete.dto';

@Controller('users')
export class UsersController {
  @Inject()
  private service: UsersService;

  @Get('get-one/:id')
  async getOne(@Param() params: GetOneDto): Promise<UserEntity> {
    return await this.service.findOne(params.id);
  }

  @Get('get-all/:skip')
  async getAll(@Param() params: GetAllDto): Promise<GetAllResponseDto> {
    return await this.service.findAll(params.skip);
  }

  @Post('register')
  async createUser(@Body() body: CreateUserDto) {
    await this.service.create(body);
  }

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res,
  ): Promise<void> {
    const token = await this.service.login(body.login, body.password);

    res.cookie('token', token);
  }

  @Post('change')
  async change(@Body() body: UserDto): Promise<void> {
    await this.service.change(body);
  }

  @Post('delete')
  async delete(@Body() body: DeleteDto): Promise<void> {
    await this.service.delete(body.id);
  }
}
