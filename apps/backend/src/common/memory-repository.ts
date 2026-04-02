export interface Repository<T extends { id: string }> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | undefined>;
  save(entity: T): Promise<T>;
}

export class InMemoryRepository<T extends { id: string }> implements Repository<T> {
  private readonly items = new Map<string, T>();

  public constructor(initialItems: T[] = []) {
    for (const item of initialItems) {
      this.items.set(item.id, item);
    }
  }

  public async findAll() {
    return [...this.items.values()];
  }

  public async findById(id: string) {
    return this.items.get(id);
  }

  public async save(entity: T) {
    this.items.set(entity.id, entity);
    return entity;
  }
}
