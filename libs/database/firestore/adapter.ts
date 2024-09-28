import { CommonAdapter } from "../types";
import {
  DocumentData,
  Firestore,
  getFirestore,
} from "firebase-admin/firestore";

let firestore: Firestore;
export class FirestoreAdapter implements CommonAdapter {
  constructor() {
    if (
      !process.env.AUTH_FIREBASE_PROJECT_ID ||
      !process.env.AUTH_FIREBASE_CLIENT_EMAIL ||
      !process.env.AUTH_FIREBASE_PRIVATE_KEY
    ) {
      throw new Error(
        "Missing Firestore environment variables inside .env.local: AUTH_FIREBASE_PROJECT_ID, AUTH_FIREBASE_CLIENT_EMAIL, AUTH_FIREBASE_PRIVATE_KEY"
      );
    }

    if (!firestore) {
      firestore = getFirestore();
    }
  }

  async getEntityById<T>(collection: string, id: string): Promise<T | null> {
    const doc = await firestore.collection(collection).doc(id).get();
    return doc.exists ? this.mapDocToEntity<T>(doc) : null;
  }

  async getEntities<T>(collection: string): Promise<T[]> {
    const snapshot = await firestore.collection(collection).get();
    return snapshot.docs.map(this.mapDocToEntity<T>);
  }

  async createEntity<T>(collection: string, data: T): Promise<T> {
    const docRef = await firestore.collection(collection).add(data);
    this.updateEntity(collection, docRef.id, { id: docRef.id });
    return { ...data, id: docRef.id };
  }

  async updateEntity<T>(
    collection: string,
    id: string,
    data: Partial<T>
  ): Promise<void> {
    await firestore.collection(collection).doc(id).update(data);
    return await this.getEntityById(collection, id);
  }

  async deleteEntity(collection: string, id: string): Promise<void> {
    await firestore.collection(collection).doc(id).delete();
  }

  async getEntitiesByQuery<T>(
    collection: string,
    field: string,
    operator: any,
    value: any
  ): Promise<T[]> {
    const snapshot = await firestore
      .collection(collection)
      .where(field, operator, value)
      .get();
    return snapshot.docs.map(this.mapDocToEntity<T>);
  }

  private mapDocToEntity<T>(doc: DocumentData): T {
    return {
      ...doc.data(),
      id: doc.id,
    } as T;
  }
}
