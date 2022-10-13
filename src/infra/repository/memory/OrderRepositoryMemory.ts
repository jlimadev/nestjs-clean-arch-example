import Order from '../../../domain/entities/Order';
import OrderRepository from '../../../domain/repository/OrderRepository';

export default class OrderRepositoryMemory implements OrderRepository {
  orders: Array<Order>;
  constructor() {
    this.orders = [];
  }

  async save(order: Order): Promise<void> {
    this.orders.push(order);
  }

  async count(): Promise<number> {
    return this.orders.length;
  }

  async getByCode(code: string): Promise<Order> {
    return (
      this.orders.find((order) => order.code.value === code) ?? ({} as Order)
    );
  }

  async getAll(): Promise<Order[]> {
    return this.orders;
  }

  async clear(): Promise<void> {
    this.orders = [];
  }
}
