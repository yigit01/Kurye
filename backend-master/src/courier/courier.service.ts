import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../user/entities/user.entity';
import { CreateCourierDto } from './dto/create-courier.dto';
import { UpdateCourierDto } from './dto/update-courier.dto';
import * as bcrypt from 'bcrypt';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class CourierService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createCourierDto: CreateCourierDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createCourierDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createCourierDto.password, salt);

    const courier = this.userRepository.create({
      ...createCourierDto,
      password: hashedPassword,
      role: UserRole.COURIER,
    });

    return await this.userRepository.save(courier);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<User>> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.shipments', 'shipments')
      .where('user.role = :role', { role: UserRole.COURIER });

    return paginate<User>(queryBuilder, options);
  }

  async findOne(id: string): Promise<User> {
    const courier = await this.userRepository.findOne({
      where: { id, role: UserRole.COURIER },
      relations: ['shipments'],
    });

    if (!courier) {
      throw new NotFoundException('Courier not found');
    }

    return courier;
  }

  async update(id: string, updateCourierDto: UpdateCourierDto): Promise<User> {
    const courier = await this.findOne(id);

    if (updateCourierDto.password) {
      const salt = await bcrypt.genSalt();
      updateCourierDto.password = await bcrypt.hash(
        updateCourierDto.password,
        salt,
      );
    }

    Object.assign(courier, updateCourierDto);
    return await this.userRepository.save(courier);
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete({
      id,
      role: UserRole.COURIER,
    });
    if (result.affected === 0) {
      throw new NotFoundException('Courier not found');
    }
  }

  async findAvailableCouriers(
    branchId: string,
    options: IPaginationOptions,
  ): Promise<Pagination<User>> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .where('user.role = :role', { role: UserRole.COURIER })
      .andWhere('user.branchId = :branchId', { branchId })
      .andWhere('user.isActive = :isActive', { isActive: true });

    return paginate<User>(queryBuilder, options);
  }
}
