import Order from '../../../domain/entities/Order';
import OrderCoupon from '../../../domain/entities/OrderCoupon';
import OrderItem from '../../../domain/entities/OrderItem';
import OrderRepository from '../../../domain/repository/OrderRepository';
import Connection from '../../database/Connection';

export default class OrderRepositoryDatabase implements OrderRepository {
  constructor(private readonly connection: Connection) {}

  async save(order: Order): Promise<void> {
    const [orderData] = await this.connection.query(
      `insert into ccca.order (code, cpf, issue_date, freight, sequence, total, coupon_code, coupon_percentage)
       values ($1, $2, $3, $4, $5, $6, $7, $8) returning *`,
      [
        order.code.value,
        order.cpf.value,
        order.issueDate,
        order.freight.getTotal(),
        order.sequence,
        order.getTotal(),
        order.coupon?.code,
        order.coupon?.percentage,
      ],
    );
    for (const orderItem of order.orderItems) {
      await this.connection.query(
        'insert into ccca.order_item (id_order, id_item, price, quantity) values ($1, $2, $3, $4)',
        [orderData.id, orderItem.idItem, orderItem.price, orderItem.quantity],
      );
    }
  }

  async count(): Promise<number> {
    const [row] = await this.connection.query(
      'select count(*)::int from ccca.order',
      [],
    );
    return row.count;
  }

  async getByCode(code: string): Promise<Order> {
    const [orderData] = await this.connection.query(
      'select * from ccca.order where code = $1',
      [code],
    );
    const order = new Order(
      orderData.cpf,
      new Date(orderData.issue_date),
      orderData.sequence,
    );
    const orderItemsData = await this.connection.query(
      'select * from ccca.order_item where id_order = $1',
      [orderData.id],
    );
    order.orderItems = orderItemsData.map(
      (orderItemData: any) =>
        new OrderItem(
          orderItemData.id_item,
          parseFloat(orderItemData.price),
          orderItemData.quantity,
        ),
    );
    order.freight.total = parseFloat(orderData.freight);
    if (orderData.coupon_code) {
      order.coupon = new OrderCoupon(
        orderData.coupon_code,
        orderData.coupon_percentage,
      );
    }
    return order;
  }

  async getAll(): Promise<Array<Order>> {
    const orders: Array<Order> = [];
    const ordersData = await this.connection.query(
      'select code from ccca.order',
      [],
    );
    for (const orderData of ordersData) {
      const order = await this.getByCode(orderData.code);
      orders.push(order);
    }
    return orders;
  }

  async clear(): Promise<void> {
    await this.connection.query('delete from ccca.order_item', []);
    await this.connection.query('delete from ccca.order', []);
  }
}
