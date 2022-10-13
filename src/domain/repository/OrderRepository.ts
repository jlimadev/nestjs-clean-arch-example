import Order from '../entities/Order';

export default interface OrderRepository {
  save(order: Order): Promise<void>;
  count(): Promise<number>;
  getAll(): Promise<Array<Order>>;
  getByCode(code: string): Promise<Order>;
  clear(): Promise<void>;
}
