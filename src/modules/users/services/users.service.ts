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
import { UserFieldDto } from 'src/types/express/userField.dto';

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

  async findByLogin(login: string): Promise<UserEntity[]> {
    const result = await this.userRepository.find({
      where: {
        login: login,
      },
      relations: ['person'],
    });

    return result;
  }

  async me(id: number): Promise<UserEntity> {
    const result = await this.userRepository.findOne(id, {
      relations: ['person'],
    });

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

    const encryptedPassword = await bcrypt.hash(user.password, 4);

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
      const person = await this.personRepository.findOne(candidate.personId);
      return this.tokenService.genToken(
        candidate.id,
        candidate.personId,
        person.role,
      );
    }

    throw new HttpException(
      'Login or password is incorrect',
      HttpStatus.FORBIDDEN,
    );
  }

  async change(user: UserDto, currentUser: UserFieldDto) {
    const userById = await this.userRepository.findOne(user.id);

    if (!userById) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (userById.id !== currentUser.userId) {
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }

    if (user.password) {
      const encryptedPassword = await bcrypt.hash(user.password, 4);
      user.password = encryptedPassword;
    }

    await this.userRepository.save(user);
  }

  async delete(id: number, user: UserFieldDto) {
    const userById = await this.userRepository.findOne(id);

    if (!userById) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (userById.id !== user.userId) {
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }

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

  async changePassword(
    password: string,
    newPassword: string,
    user: UserFieldDto,
  ) {
    const userById = await this.userRepository.findOne(user.userId);

    console.log(password);

    if (bcrypt.compareSync(password, userById.password)) {
      const encryptedPassword = await bcrypt.hash(newPassword, 4);

      this.userRepository.save({
        id: user.userId,
        password: encryptedPassword,
      });

      return;
    }

    throw new HttpException(
      'Current password is not correct',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
