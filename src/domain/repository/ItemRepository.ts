import Item from '../entities/Item';

export default interface ItemRepository {
  save(item: Item): Promise<void>;
  getById(id: number): Promise<Item>;
  getAll(): Promise<Array<Item>>;
}
