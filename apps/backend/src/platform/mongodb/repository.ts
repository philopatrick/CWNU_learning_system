import type { ObjectId, Filter } from "mongodb";
import { getCollection } from "./client.js";

export interface EntityBase {
  _id?: ObjectId;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class MongoRepository<T extends EntityBase> {
  protected abstract get collectionName(): string;

  protected get collection() {
    return getCollection<T>(this.collectionName);
  }

  async findAll(): Promise<T[]> {
    return this.collection.find({}).toArray() as Promise<T[]>;
  }

  async findById(id: string): Promise<T | undefined> {
    return this.collection.findOne({ id } as Filter<T>) as Promise<T | undefined>;
  }

  async save(entity: T): Promise<T> {
    const now = new Date();
    entity.updatedAt = now;
    if (!entity.createdAt) {
      entity.createdAt = now;
    }

    await this.collection.updateOne(
      { id: entity.id } as Filter<T>,
      { $set: entity },
      { upsert: true }
    );
    return entity;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ id } as Filter<T>);
    return result.deletedCount > 0;
  }

  async findByQuery(query: Record<string, unknown>): Promise<T[]> {
    return this.collection.find(query as Filter<T>).toArray() as Promise<T[]>;
  }

  async findOneByQuery(query: Record<string, unknown>): Promise<T | undefined> {
    return this.collection.findOne(query as Filter<T>) as Promise<T | undefined>;
  }
}
