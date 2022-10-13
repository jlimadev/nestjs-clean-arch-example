import ItemRepository from '../domain/repository/ItemRepository';

type GetItemsOutput = {
  id: number;
  description: string;
  price: number;
};

export default class GetItems {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(): Promise<Array<GetItemsOutput>> {
    const items = await this.itemRepository.getAll();
    const itemsOutput = items.map((item) => {
      const output: GetItemsOutput = {
        id: item.id,
        description: item.description,
        price: item.price,
      };
      return output;
    });
    return itemsOutput;
  }
}
