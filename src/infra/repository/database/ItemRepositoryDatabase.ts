import Dimension from '../../../domain/entities/Dimension';
import Item from '../../../domain/entities/Item';
import ItemRepository from '../../../domain/repository/ItemRepository';
import Connection from '../../database/Connection';

export default class ItemRepositoryDatabase implements ItemRepository {
  private readonly itemsTable = 'ccca.item';

  constructor(private readonly connection: Connection) {}

  save(item: Item): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getById(id: number): Promise<Item> {
    const [itemData] = await this.connection.query(
      `select * from ${this.itemsTable} where id = $1`,
      [id],
    );
    if (!itemData) throw new Error(`item ${id} not found`);
    const itemDimension = new Dimension(
      itemData.height,
      itemData.width,
      itemData.length,
    );
    const item = new Item(
      itemData.id,
      itemData.category,
      itemData.description,
      itemData.price,
      itemDimension,
      itemData.weight,
    );
    return item;
  }

  async getAll(): Promise<Item[]> {
    const itemsData = await this.connection.query(
      `select * from ${this.itemsTable}`,
      [],
    );
    const items: Array<Item> = itemsData.map((item: any) => {
      return new Item(item.id, item.category, item.description, item.price);
    });
    return items;
  }
}
