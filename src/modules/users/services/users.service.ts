import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from '../DTO/createUser.dto';
import { UserEntity } from '../entities/user.entity';
import bcrypt from 'bcrypt';
import { TokenService } from './token.service';
import { JwtTokenDto } from '../DTO/jwtToken.dto';
import { PersonEntity } from '../entities/person.entity';
import { UserDto } from '../DTO/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(UserEntity)
    private readonly personRepository: Repository<PersonEntity>,

    private readonly tokenService: TokenService,
  ) {}

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

  async create(user: CreateUserDto): Promise<UserEntity> {
    const encryptedPassword = await bcrypt.hash(user.password, 3);

    const person = await this.personRepository.save({
      dateOfBirth: user.dateOfBirth,
      firstName: user.firstName,
      lastName: user.lastName,
      surName: user.surName,
      fullName: user.lastName + ' ' + user.firstName + ' ' + user.surName,
    });

    const result = await this.userRepository.save({
      login: user.login,
      password: encryptedPassword,
      personId: person.id,
    });

    return result;
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
    await this.userRepository.save(user);
  }
}
