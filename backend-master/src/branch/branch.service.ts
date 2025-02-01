import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from './entities/branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ) {}

  async create(createBranchDto: CreateBranchDto): Promise<Branch> {
    const branch = this.branchRepository.create(createBranchDto);
    return await this.branchRepository.save(branch);
  }

  async findAll(): Promise<Branch[]> {
    return await this.branchRepository.find({
      relations: ['staff', 'shipments'],
    });
  }

  async findOne(id: string): Promise<Branch> {
    const branch = await this.branchRepository.findOne({
      where: { id },
      relations: ['staff', 'shipments'],
    });

    if (!branch) {
      throw new NotFoundException('Branch not found');
    }

    return branch;
  }

  async update(id: string, updateBranchDto: UpdateBranchDto): Promise<Branch> {
    const branch = await this.findOne(id);
    Object.assign(branch, updateBranchDto);
    return await this.branchRepository.save(branch);
  }

  async remove(id: string): Promise<void> {
    const result = await this.branchRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Branch not found');
    }
  }
}
