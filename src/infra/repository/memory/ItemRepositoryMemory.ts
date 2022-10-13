import Item from '../../../domain/entities/Item';
import ItemRepository from '../../../domain/repository/ItemRepository';

export default class ItemRepositoryMemory implements ItemRepository {
  items: Array<Item>;

  constructor() {
    this.items = [];
  }

  async save(item: Item): Promise<void> {
    this.items.push(item);
  }

  async getById(id: number): Promise<Item> {
    const item = this.items.find((it) => it.id === id);
    if (!item) throw new Error(`Item not found. Item id: ${id}`);
    return item;
  }

  async getAll(): Promise<Array<Item>> {
    return this.items;
  }
}
