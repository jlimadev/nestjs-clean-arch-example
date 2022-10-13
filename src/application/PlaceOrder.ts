import Order from '../domain/entities/Order';
import RepositoryFactory from '../domain/factory/RepositoryFactory';
import CouponRepository from '../domain/repository/CouponRepository';
import ItemRepository from '../domain/repository/ItemRepository';
import OrderRepository from '../domain/repository/OrderRepository';

type OrderItemsInput = {
  idItem: number;
  quantity: number;
};

type PlaceOrderInput = {
  cpf: string;
  orderItems: Array<OrderItemsInput>;
  coupon?: string;
  date?: Date;
};

type PlaceOrderOutput = {
  code: string;
  total: number;
};

export default class PlaceOrder {
  private readonly itemRepository: ItemRepository;
  private readonly orderRepository: OrderRepository;
  private readonly couponRepository: CouponRepository;

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.couponRepository = this.repositoryFactory.createCouponRepository();
    this.itemRepository = this.repositoryFactory.createItemRepository();
    this.orderRepository = this.repositoryFactory.createOrderRepository();
  }

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const sequence = (await this.orderRepository.count()) + 1;
    const order = new Order(input.cpf, input.date, sequence);
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getById(orderItem.idItem);
      order.addItem(item, orderItem.quantity);
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.get(input.coupon);
      order.addCoupon(coupon);
    }
    await this.orderRepository.save(order);
    const total = order.getTotal();
    const code = order.code.value;
    return { code, total };
  }
}
