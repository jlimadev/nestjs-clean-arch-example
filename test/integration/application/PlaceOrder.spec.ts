import PlaceOrder from '../../../src/application/PlaceOrder';
import RepositoryFactory from '../../../src/domain/factory/RepositoryFactory';
import CouponRepository from '../../../src/domain/repository/CouponRepository';
import ItemRepository from '../../../src/domain/repository/ItemRepository';
import OrderRepository from '../../../src/domain/repository/OrderRepository';
import Connection from '../../../src/infra/database/Connection';
import PgPromiseConnectionAdapter from '../../../src/infra/database/PgPromiseConnectionAdapter';
import DatabaseRepositoryFactory from '../../../src/infra/factory/DatabaseRepositoryFactory';
import CouponRepositoryDatabase from '../../../src/infra/repository/database/CouponRepositoryDatabase';
import ItemRepositoryDatabase from '../../../src/infra/repository/database/ItemRepositoryDatabase';
import OrderRepositoryDatabase from '../../../src/infra/repository/database/OrderRepositoryDatabase';

describe('PlaceOrder', () => {
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

  const makeSut = () => {
    const placeOrder = new PlaceOrder(repositoryFactory);
    return placeOrder;
  };

  it('should place an order', async () => {
    const getItemSpy = jest.spyOn(ItemRepositoryDatabase.prototype, 'getById');
    const saveOrderSpy = jest.spyOn(OrderRepositoryDatabase.prototype, 'save');
    const input = {
      cpf: '935.411.347-80',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      date: new Date('2022-01-01T10:00:00'),
    };
    const placeOrder = makeSut();
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(6350);
    expect(getItemSpy).toHaveBeenCalledTimes(3);
    expect(saveOrderSpy).toHaveBeenCalledTimes(1);
  });
  it('should place an order with discount', async () => {
    const getCouponSpy = jest.spyOn(CouponRepositoryDatabase.prototype, 'get');
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
    const placeOrder = makeSut();
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(5132);
    expect(getCouponSpy).toHaveBeenCalledTimes(1);
  });
  it('should place an order and generate the order code', async () => {
    const input = {
      cpf: '935.411.347-80',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      date: new Date('2022-01-01T10:00:00'),
    };
    const placeOrder = makeSut();
    const output = await placeOrder.execute(input);
    expect(output.code).toBe('202200000001');
  });
});
