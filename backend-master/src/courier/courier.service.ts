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
import * as argon2 from 'argon2';
import {
  FilterOperator,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';

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

    const hashedPassword = await argon2.hash(createCourierDto.password);

    const courier = this.userRepository.create({
      ...createCourierDto,
      password: hashedPassword,
      role: UserRole.COURIER,
    });

    return await this.userRepository.save(courier);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<User>> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.shipments', 'shipments')
      .where('user.role = :role', { role: UserRole.COURIER });

    return paginate(query, queryBuilder, {
      sortableColumns: ['createdAt', 'fullName', 'email'],
      searchableColumns: ['fullName', 'email', 'phone'],
      defaultSortBy: [['createdAt', 'DESC']],
      filterableColumns: {
        isActive: [FilterOperator.EQ],
        branchId: [FilterOperator.EQ],
      },
    });
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
      updateCourierDto.password = await argon2.hash(updateCourierDto.password);
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
    query: PaginateQuery,
  ): Promise<Paginated<User>> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .where('user.role = :role', { role: UserRole.COURIER })
      .andWhere('user.branchId = :branchId', { branchId })
      .andWhere('user.isActive = :isActive', { isActive: true });

    return paginate(query, queryBuilder, {
      sortableColumns: ['createdAt', 'fullName'],
      searchableColumns: ['fullName', 'email', 'phone'],
      defaultSortBy: [['createdAt', 'DESC']],
      filterableColumns: {
        isActive: [FilterOperator.EQ],
      },
    });
  }
}
