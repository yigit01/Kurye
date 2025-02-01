import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Shipment, ShipmentStatus } from '../shipment/entities/shipment.entity';
import { User, UserRole } from '../user/entities/user.entity';
import { Branch } from '../branch/entities/branch.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Shipment)
    private shipmentRepository: Repository<Shipment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ) {}

  async getShipmentStats(startDate: Date, endDate: Date) {
    const shipments = await this.shipmentRepository
      .createQueryBuilder('shipment')
      .where('shipment.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getMany();

    return {
      total: shipments.length,
      byStatus: {
        created: shipments.filter((s) => s.status === ShipmentStatus.CREATED)
          .length,
        inTransit: shipments.filter(
          (s) => s.status === ShipmentStatus.IN_TRANSIT,
        ).length,
        delivered: shipments.filter(
          (s) => s.status === ShipmentStatus.DELIVERED,
        ).length,
        failed: shipments.filter((s) => s.status === ShipmentStatus.FAILED)
          .length,
      },
    };
  }

  async getCourierPerformance(startDate: Date, endDate: Date) {
    const couriers = await this.userRepository.find({
      where: { role: UserRole.COURIER },
      relations: ['shipments'],
    });

    return Promise.all(
      couriers.map(async (courier) => {
        const deliveredShipments = await this.shipmentRepository.count({
          where: {
            assignedCourier: { id: courier.id },
            status: ShipmentStatus.DELIVERED,
            updatedAt: Between(startDate, endDate),
          },
        });

        const failedShipments = await this.shipmentRepository.count({
          where: {
            assignedCourier: { id: courier.id },
            status: ShipmentStatus.FAILED,
            updatedAt: Between(startDate, endDate),
          },
        });

        return {
          courierId: courier.id,
          courierName: courier.fullName,
          deliveredCount: deliveredShipments,
          failedCount: failedShipments,
          successRate:
            (deliveredShipments / (deliveredShipments + failedShipments)) * 100,
        };
      }),
    );
  }

  async getBranchPerformance(startDate: Date, endDate: Date) {
    const branches = await this.branchRepository.find();

    return Promise.all(
      branches.map(async (branch) => {
        const processedShipments = await this.shipmentRepository.count({
          where: {
            currentBranch: { id: branch.id },
            updatedAt: Between(startDate, endDate),
          },
        });

        const deliveredShipments = await this.shipmentRepository.count({
          where: {
            currentBranch: { id: branch.id },
            status: ShipmentStatus.DELIVERED,
            updatedAt: Between(startDate, endDate),
          },
        });

        return {
          branchId: branch.id,
          branchName: branch.name,
          processedCount: processedShipments,
          deliveredCount: deliveredShipments,
          throughputRate: (deliveredShipments / processedShipments) * 100,
        };
      }),
    );
  }
}
