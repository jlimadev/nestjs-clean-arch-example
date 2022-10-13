import GetOrders from '../../../src/application/GetOrders';
import PlaceOrder from '../../../src/application/PlaceOrder';
import RepositoryFactory from '../../../src/domain/factory/RepositoryFactory';
import CouponRepository from '../../../src/domain/repository/CouponRepository';
import ItemRepository from '../../../src/domain/repository/ItemRepository';
import OrderRepository from '../../../src/domain/repository/OrderRepository';
import Connection from '../../../src/infra/database/Connection';
import PgPromiseConnectionAdapter from '../../../src/infra/database/PgPromiseConnectionAdapter';
import DatabaseRepositoryFactory from '../../../src/infra/factory/DatabaseRepositoryFactory';

describe('GetOrders', () => {
  let connection: Connection;
  let repositoryFactory: RepositoryFactory;
  let couponRepository: CouponRepository;
  let itemRepository: ItemRepository;
  let orderRepository: OrderRepository;

  beforeEach(async () => {
    connection = new PgPromiseConnectionAdapter();
    repositoryFactory = new DatabaseRepositoryFactory(connection);
    couponRepository = repositoryFactory.createCouponRepository();
    itemRepository = repositoryFactory.createItemRepository();
    orderRepository = repositoryFactory.createOrderRepository();
    await orderRepository.clear();
  });

  afterEach(async () => {
    await connection.close();
  });

  it('should an empty list when get orders', async () => {
    const getOrders = new GetOrders(orderRepository);
    const output = await getOrders.execute();
    expect(output).toHaveLength(0);
  });

  it('should get the orders', async () => {
    const input = {
      cpf: '935.411.347-80',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      coupon: '20OFF',
      date: new Date('2022-01-01T10:00:00'),
    };
    const placeOrder = new PlaceOrder(repositoryFactory);
    await placeOrder.execute(input);
    await placeOrder.execute(input);
    const getOrders = new GetOrders(orderRepository);
    const output = await getOrders.execute();
    const [firstOrder, secondOrder] = output;
    expect(output).toHaveLength(2);
    expect(firstOrder).toEqual({ code: '202200000001', total: 5132 });
    expect(secondOrder).toEqual({ code: '202200000002', total: 5132 });
  });
});
