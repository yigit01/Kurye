export enum PaymentType {
  CASH = "cash",
  CREDIT_CARD = "credit_card",
  BANK_TRANSFER = "bank_transfer",
}

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

export interface Dimensions {
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
  status: ShipmentStatus;
  paymentType: PaymentType;
  amount: number;
  dimensions?: Dimensions;
  createdAt: Date;
  updatedAt: Date;
}
