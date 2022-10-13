import OrderRepository from '../domain/repository/OrderRepository';

type GetOrderOutput = {
  code: string;
  total: number;
};

export default class GetOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(code: string): Promise<GetOrderOutput> {
    const order = await this.orderRepository.getByCode(code);
    return { code: order.code.value, total: order.getTotal() };
  }
}
