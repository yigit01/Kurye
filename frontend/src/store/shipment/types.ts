import { User } from "../auth/types";
import { Branch } from "../branch/types";

export enum ShipmentStatus {
  CREATED = "created",
  COURIER_ASSIGNED = "courier_assigned",
  PICKED_UP = "picked_up",
  IN_BRANCH = "in_branch",
  IN_TRANSIT = "in_transit",
  OUT_FOR_DELIVERY = "out_for_delivery",
  DELIVERED = "delivered",
  FAILED = "failed",
}

export enum PaymentType {
  CASH = "cash",
  CREDIT_CARD = "credit_card",
  BANK_TRANSFER = "bank_transfer",
}

export interface ShipmentDimensions {
  weight: number;
  width: number;
  height: number;
  length: number;
}

export interface Shipment {
  id: string;
  trackingCode: string;
  sender: User;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  status: ShipmentStatus;
  paymentType: PaymentType;
  amount: number;
  currentBranch: Branch;
  assignedCourier: User | null;
  dimensions: ShipmentDimensions | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateShipmentDto {
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  paymentType: PaymentType;
  amount: number;
  dimensions?: ShipmentDimensions;
}

export interface UpdateShipmentDto {
  status?: ShipmentStatus;
  currentBranch?: string;
  assignedCourier?: string;
}

export interface TransferShipmentDto {
  targetBranchId: string;
}

export interface PaginatedShipments {
  data: Shipment[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: [string, string][];
  };
  links: {
    current: string;
  };
}

export interface ShipmentState {
  shipment: Shipment | null;
  shipments: PaginatedShipments | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ShipmentState = {
  shipment: null,
  shipments: null,
  loading: false,
  error: null,
};
