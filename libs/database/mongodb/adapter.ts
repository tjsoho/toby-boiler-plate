import { CommonAdapter } from "../types";
import { MongoClient, ObjectId } from "mongodb";

export class MongooseAdapter implements CommonAdapter {
  client: MongoClient;

  constructor() {
    if (!process.env.MONGO_DB_URI) {
      throw new Error(
        "Add the MONGO_DB_URI environment variables inside .env.local to use mongoose"
      );
    }
    this.client = new MongoClient(process.env.MONGO_DB_URI);
  }

  async getEntityById<T>(collection: string, id: string): Promise<T | null> {
    const objectId = new ObjectId(id);
    return (await this.client
      .db()
      .collection(collection)
      .findOne({ _id: objectId })) as T;
  }

  async getEntities<T>(collection: string): Promise<T[]> {
    return (await this.client
      .db()
      .collection(collection)
      .find()
      .toArray()) as T[];
  }
  async createEntity<T>(collection: string, data: T): Promise<T> {
    const newNentity = await this.client
      .db()
      .collection(collection)
      .insertOne(data)
      .then(() => data);

    // New entity is created with an _id field is ObjectId type so we need to get back the id as a string
    const entityId = (newNentity as any)._id.toHexString();
    await this.updateEntity(collection, entityId, {
      id: entityId,
    });

    return { ...newNentity, id: entityId };
  }

  async updateEntity<T>(
    collection: string,
    id: string,
    data: Partial<T>
  ): Promise<void> {
    const objectId = new ObjectId(id);
    await this.client
      .db()
      .collection(collection)
      .updateOne({ _id: objectId }, { $set: data });
  }

  async deleteEntity(collection: string, id: string): Promise<void> {
    const objectId = new ObjectId(id);
    await this.client.db().collection(collection).deleteOne({
      _id: objectId,
    });
  }

  async getEntitiesByQuery<T>(
    collection: string,
    field: string,
    operator: string,
    value: any
  ): Promise<T[]> {
    // Convert value to ObjectId if the field is "_id" and the value is a string
    if (field === "_id" && typeof value === "string") {
      value = new ObjectId(value);
    }

    // map operator to mongodb operator
    if (operator === "==") {
      operator = "$eq";
    } else if (operator === "<") {
      operator = "$lt";
    } else if (operator === "<=") {
      operator = "$lte";
    } else if (operator === ">") {
      operator = "$gt";
    } else if (operator === ">=") {
      operator = "$gte";
    } else if (operator === "!=") {
      operator = "$not";
    }

    const query = { [field]: { [operator]: value } };
    return (await this.client
      .db()
      .collection(collection)
      .find(query)
      .toArray()) as T[];
  }
}
