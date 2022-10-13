import GetOrder from '../../application/GetOrder';
import GetOrders from '../../application/GetOrders';
import OrderRepository from '../../domain/repository/OrderRepository';
import Http from '../http/Http';

export default class OrderController {
  constructor(
    private readonly http: Http,
    private readonly orderRepository: OrderRepository,
  ) {
    this.http.on('get', '/orders', async (params: any, body: any) => {
      const getOrders = new GetOrders(this.orderRepository);
      const output = await getOrders.execute();
      return output;
    });

    this.http.on('get', '/orders/:code', async (params: any, body: any) => {
      const getOrders = new GetOrder(this.orderRepository);
      const output = await getOrders.execute(params.code);
      return output;
    });
  }
}
