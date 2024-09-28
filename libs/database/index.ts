import config from "@/appConfig";
import { FirestoreAdapter } from "./firestore/adapter";
import { MongooseAdapter } from "./mongodb/adapter";
import { CommonAdapter, Product, User } from "./types";
import { DatabaseType } from "../types";

const COLLECTION_NAME_USERS = "users";
const COLLECTION_NAME_WAITLIST = "waitlist";

export class Database {
  private dbOperations: CommonAdapter;

  constructor() {
    if (!this.dbOperations) {
      if (config.database.provider === DatabaseType.FIRESTORE) {
        this.dbOperations = new FirestoreAdapter();
      } else if (config.database.provider === DatabaseType.MONGODB) {
        this.dbOperations = new MongooseAdapter();
      } else {
        throw new Error("Invalid DATABASE_PROVIDER in .env file");
      }
    }
  }

  getUserById(id: string) {
    if (!id) return null;

    return this.dbOperations.getEntityById<User>(COLLECTION_NAME_USERS, id);
  }

  updateUserById(id: string, data: Partial<User>) {
    return this.dbOperations.updateEntity<User>(
      COLLECTION_NAME_USERS,
      id,
      data
    );
  }

  async getUserByEmail(email: string) {
    if (!email) return null;

    const [firstUser] = await this.dbOperations.getEntitiesByQuery<User>(
      COLLECTION_NAME_USERS,
      "email",
      "==",
      email
    );
    return firstUser;
  }

  async getUserByCustomerId(customerId: string) {
    const [firstUser] = await this.dbOperations.getEntitiesByQuery<User>(
      COLLECTION_NAME_USERS,
      "customerId",
      "==",
      customerId
    );
    return firstUser;
  }

  createUser(
    email: string,
    name: string,
    customerId: string,
    products: Product[]
  ) {
    return this.dbOperations.createEntity<User>(COLLECTION_NAME_USERS, {
      id: "",
      customerId,
      createdAt: new Date(),
      email,
      name,
      image: "",
      products,
    });
  }

  createWaitlistUser(email: string) {
    return this.dbOperations.createEntity(COLLECTION_NAME_WAITLIST, {
      email,
      createdAt: new Date(),
    });
  }

  // Add other methods as needed
}
