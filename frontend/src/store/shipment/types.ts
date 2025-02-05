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
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  status: string;
  paymentType: string;
  amount: string;
  dimensions: {
    width: number;
    height: number;
    length: number;
    weight: number;
  };
  createdAt: string;
  updatedAt: string;
  sender: any;
  currentBranch: any;
  assignedCourier: any;
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
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface ShipmentState {
  shipments: PaginatedShipments | null;
  shipment: Shipment | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ShipmentState = {
  shipment: null,
  shipments: null,
  loading: false,
  error: null,
};
