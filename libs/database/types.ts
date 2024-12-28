import type { PaymentType } from "../types";

export interface User {
  id: string;
  customerId: string;
  createdAt: Date;
  email: string;
  name: string;
  image: string;
  products: Product[];
}

export interface Product {
  // get data form payment provider as much as possible
  name: string;
  priceId: string;
  isActive: boolean;
  purchasedAt: string;
  updatedAt: string;
  paymentProvider: PaymentType;
}

// This is interface shared by all datatabse adapters (Mongoose, Firestore, etc)
export interface CommonAdapter {
  getEntityById<T>(collection: string, id: string): Promise<T | null>;
  getEntities<T>(collection: string): Promise<T[]>;
  createEntity<T>(collection: string, data: T): Promise<T>;
  updateEntity<T>(
    collection: string,
    id: string,
    data: Partial<T>
  ): Promise<void>;
  deleteEntity(collection: string, id: string): Promise<void>;
  getEntitiesByQuery<T>(
    collection: string,
    field: string,
    operator: "==" | ">" | "<" | ">=" | "<=" | "!=",
    value: any
  ): Promise<T[]>;
}
