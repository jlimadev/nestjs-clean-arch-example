import GetOrder from '../../../src/application/GetOrder';
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

  it('should get an order by code', async () => {
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
    const getOrder = new GetOrder(orderRepository);
    const output = await getOrder.execute('202200000001');
    expect(output).toEqual({ code: '202200000001', total: 5132 });
  });
});
