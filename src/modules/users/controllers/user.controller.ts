import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../DTO/createUser.dto';
import { GetAllDto } from '../DTO/getAllUsers.dto';
import { GetAllResponseDto } from '../DTO/getAllResponse.dto';
import { GetByNameDto } from '../DTO/getByName.dto';
import { GetOneDto } from '../DTO/getOneUser.dto';
import { LoginDto } from '../DTO/login.dto';
import { Roles, UserEntity } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { UserDto } from '../DTO/user.dto';
import { DeleteDto } from 'src/modules/common/dto/delete.dto';
import { IsVisibleNameTakenDto } from '../DTO/isVisibleNameTaken.dto';
import { IsLoginTakenDto } from '../DTO/isLoginTaken.dto';
import { RequireRole } from '../guards/role.guard';
import { AuthGuard } from '../guards/auth.guard';
import { User } from 'src/modules/common/decorators/user.decoratoor';
import { UserFieldDto } from 'src/types/express/userField.dto';
import { resolveSoa } from 'dns';

@Controller('users')
export class UsersController {
  @Inject()
  private service: UsersService;

  @Get('me')
  async me(@User() user: UserFieldDto) {
    return await this.service.me(user.userId);
  }

  @Get('get-one/:id')
  @RequireRole(Roles.ADMIN)
  async getOne(@Param() params: GetOneDto): Promise<UserEntity> {
    return await this.service.findOne(params.id);
  }

  @Get('get-all/:skip')
  @RequireRole(Roles.ADMIN)
  async getAll(@Param() params: GetAllDto): Promise<GetAllResponseDto> {
    return await this.service.findAll(params.skip);
  }

  @Get('is-visible-name-taken/:name')
  async isVisibleNameTaken(@Param() params: IsVisibleNameTakenDto) {
    return await this.service.isVisibleNameTaken(params.name);
  }

  @Get('is-login-taken/:name')
  async isLoginTaken(@Param() params: IsLoginTakenDto) {
    return await this.service.isLoginTaken(params.login);
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
  @UseGuards(AuthGuard)
  async change(
    @User() user: UserFieldDto,
    @Body() body: UserDto,
  ): Promise<void> {
    await this.service.change(body, user);
  }

  @Post('delete')
  @UseGuards(AuthGuard)
  async delete(
    @User() user: UserFieldDto,
    @Body() body: DeleteDto,
  ): Promise<void> {
    await this.service.delete(body.id, user);
  }
}
