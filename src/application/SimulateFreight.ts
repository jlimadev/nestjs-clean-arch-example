import Freight from '../domain/entities/Freight';
import ItemRepository from '../domain/repository/ItemRepository';

type OrderItems = {
  idItem: number;
  quantity: number;
};

type SimulateFreightInput = {
  orderItems: Array<OrderItems>;
};

type SimulateFreightOutput = {
  total: number;
};

export default class SimulateFreight {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(input: SimulateFreightInput): Promise<SimulateFreightOutput> {
    const freight = new Freight();
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getById(orderItem.idItem);
      freight.addItem(item, orderItem.quantity);
    }
    const total = freight.getTotal();
    return { total };
  }
}
