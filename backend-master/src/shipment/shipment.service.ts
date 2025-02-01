import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment, ShipmentStatus } from './entities/shipment.entity';
import { ShipmentHistory } from './entities/shipment-history.entity';
import { User, UserRole } from '../user/entities/user.entity';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { generateTrackingCode } from '../utils/tracking-code.generator';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { TransferShipmentDto } from './dto/transfer-shipment.dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Branch } from '../branch/entities/branch.entity';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectRepository(Shipment)
    private shipmentRepository: Repository<Shipment>,
    @InjectRepository(ShipmentHistory)
    private shipmentHistoryRepository: Repository<ShipmentHistory>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ) {}

  async create(
    createShipmentDto: CreateShipmentDto,
    userId: string,
  ): Promise<Shipment> {
    const sender = await this.userRepository.findOne({ where: { id: userId } });
    if (!sender) {
      throw new NotFoundException('Sender not found');
    }

    const trackingCode = await generateTrackingCode();
    const shipment = this.shipmentRepository.create({
      ...createShipmentDto,
      sender,
      trackingCode,
      status: ShipmentStatus.CREATED,
    });

    const savedShipment = await this.shipmentRepository.save(shipment);

    // Create initial history record
    await this.createShipmentHistory(
      savedShipment,
      ShipmentStatus.CREATED,
      sender,
      'Shipment created',
    );

    return savedShipment;
  }

  async findAll(
    userId: string,
    role: UserRole,
    options: IPaginationOptions,
  ): Promise<Pagination<Shipment>> {
    const query = this.shipmentRepository
      .createQueryBuilder('shipment')
      .leftJoinAndSelect('shipment.sender', 'sender')
      .leftJoinAndSelect('shipment.currentBranch', 'currentBranch')
      .leftJoinAndSelect('shipment.assignedCourier', 'assignedCourier');

    if (role === UserRole.CUSTOMER) {
      query.where('sender.id = :userId', { userId });
    } else if (role === UserRole.COURIER) {
      query.where('assignedCourier.id = :userId', { userId });
    }

    return paginate<Shipment>(query, options);
  }

  async findOne(id: string): Promise<Shipment> {
    const shipment = await this.shipmentRepository.findOne({
      where: { id },
      relations: [
        'sender',
        'currentBranch',
        'assignedCourier',
        'history',
        'history.updatedBy',
      ],
    });

    if (!shipment) {
      throw new NotFoundException('Shipment not found');
    }

    return shipment;
  }

  async findByTrackingCode(trackingCode: string): Promise<Shipment> {
    const shipment = await this.shipmentRepository.findOne({
      where: { trackingCode },
      relations: [
        'sender',
        'currentBranch',
        'assignedCourier',
        'history',
        'history.updatedBy',
      ],
    });

    if (!shipment) {
      throw new NotFoundException('Shipment not found');
    }

    return shipment;
  }

  async update(
    id: string,
    updateShipmentDto: UpdateShipmentDto,
    userId: string,
  ): Promise<Shipment> {
    const shipment = await this.findOne(id);
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(shipment, updateShipmentDto);
    const updatedShipment = await this.shipmentRepository.save(shipment);

    if (
      updateShipmentDto.status &&
      updateShipmentDto.status !== shipment.status
    ) {
      await this.createShipmentHistory(
        updatedShipment,
        updateShipmentDto.status,
        user,
        updateShipmentDto.statusDescription,
      );
    }

    return updatedShipment;
  }

  async assignCourier(
    shipmentId: string,
    courierId: string,
    userId: string,
  ): Promise<Shipment> {
    const shipment = await this.findOne(shipmentId);
    const courier = await this.userRepository.findOne({
      where: { id: courierId, role: UserRole.COURIER },
    });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!courier) {
      throw new NotFoundException('Courier not found');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    shipment.assignedCourier = courier;
    shipment.status = ShipmentStatus.COURIER_ASSIGNED;
    const updatedShipment = await this.shipmentRepository.save(shipment);

    await this.createShipmentHistory(
      updatedShipment,
      ShipmentStatus.COURIER_ASSIGNED,
      user,
      `Assigned to courier: ${courier.fullName}`,
    );

    return updatedShipment;
  }

  async transferToBranch(
    id: string,
    transferShipmentDto: TransferShipmentDto,
    userId: string,
  ): Promise<Shipment> {
    const shipment = await this.findOne(id);
    const targetBranch = await this.branchRepository.findOne({
      where: { id: transferShipmentDto.targetBranchId },
    });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!targetBranch) {
      throw new NotFoundException('Target branch not found');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if shipment is already in the target branch
    if (shipment.currentBranch?.id === targetBranch.id) {
      throw new BadRequestException('Shipment is already in this branch');
    }

    // Update shipment
    shipment.currentBranch = targetBranch;
    shipment.status = ShipmentStatus.IN_TRANSIT;
    const updatedShipment = await this.shipmentRepository.save(shipment);

    // Create history record
    await this.createShipmentHistory(
      updatedShipment,
      ShipmentStatus.IN_TRANSIT,
      user,
      `Transferred to branch: ${targetBranch.name}${
        transferShipmentDto.transferNote
          ? ` - ${transferShipmentDto.transferNote}`
          : ''
      }`,
    );

    return updatedShipment;
  }

  private async createShipmentHistory(
    shipment: Shipment,
    status: ShipmentStatus,
    updatedBy: User,
    description?: string,
  ): Promise<void> {
    const history = this.shipmentHistoryRepository.create({
      shipment,
      status,
      updatedBy,
      description,
    });

    await this.shipmentHistoryRepository.save(history);
  }
}
