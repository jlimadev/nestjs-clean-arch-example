import OrderRepository from '../domain/repository/OrderRepository';

type GetOrdersOutput = {
  code: string;
  total: number;
};

export default class GetOrders {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<Array<GetOrdersOutput>> {
    const orders = await this.orderRepository.getAll();
    const output = orders.map((order) => {
      return { code: order.code.value, total: order.getTotal() };
    });
    return output;
  }
}
