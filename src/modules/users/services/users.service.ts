import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from '../DTO/createUser.dto';
import { Roles, UserEntity } from '../entities/user.entity';
import bcrypt from 'bcrypt';
import { TokenService } from './token.service';
import { JwtTokenDto } from '../DTO/jwtToken.dto';
import { PersonEntity } from '../entities/person.entity';
import { UserDto } from '../DTO/user.dto';

@Injectable()
export class UsersService {
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  @InjectRepository(PersonEntity)
  private readonly personRepository: Repository<PersonEntity>;

  @Inject()
  private readonly tokenService: TokenService;

  async findOne(id: number): Promise<UserEntity> {
    const result = await this.userRepository.findOne(id);

    if (!result) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async findAll(skip: number) {
    const [result, total] = await this.userRepository.findAndCount({
      take: 10,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  async create(user: CreateUserDto) {
    const isLoginTaken = await this.isLoginTaken(user.login);
    const isVisibleNameTaken = await this.isVisibleNameTaken(user.visibleName);

    if (isLoginTaken) {
      throw new HttpException('Login is already taken', HttpStatus.BAD_REQUEST);
    }

    if (isVisibleNameTaken) {
      throw new HttpException(
        'Visible name is already taken',
        HttpStatus.BAD_REQUEST,
      );
    }

    const encryptedPassword = await bcrypt.hash(user.password, 3);

    const person = await this.personRepository.save({
      dateOfBirth: user.dateOfBirth,
      firstName: user.firstName,
      lastName: user.lastName,
      surName: user.surName,
      fullName: user.lastName + ' ' + user.firstName + ' ' + user.surName,
      visableName: user.visibleName,
      role: Roles.REGULAR_USER,
    });

    await this.userRepository.save({
      login: user.login,
      password: encryptedPassword,
      personId: person.id,
    });
  }

  async login(login: string, password: string): Promise<string> {
    const candidate = await this.userRepository.findOne({
      where: {
        login: login,
      },
    });

    if (!candidate) {
      throw new HttpException(
        'Login or password is incorrect',
        HttpStatus.FORBIDDEN,
      );
    }

    if (bcrypt.compareSync(password, candidate.password)) {
      const person = await this.personRepository.findOne(candidate.person);
      return this.tokenService.genToken(candidate.id, person.role);
    }

    throw new HttpException(
      'Login or password is incorrect',
      HttpStatus.FORBIDDEN,
    );
  }

  async change(user: UserDto) {
    if (user.password) {
      const encryptedPassword = await bcrypt.hash(user.password, 3);
      user.password = encryptedPassword;
    }

    await this.userRepository.save(user);
  }

  async delete(id: number) {
    await this.userRepository.delete(id);
  }

  async isVisibleNameTaken(name: string) {
    const isVisibleNameTaken = await this.personRepository.findOne({
      where: {
        visableName: name,
      },
    });

    if (isVisibleNameTaken) {
      return true;
    }

    return false;
  }

  async isLoginTaken(login: string) {
    const isLoginTaken = await this.userRepository.findOne({
      where: {
        login: login,
      },
    });

    if (isLoginTaken) {
      return true;
    }

    return false;
  }
}
