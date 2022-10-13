import Coupon from './Coupon';
import CPF from './Cpf';
import Freight from './Freight';
import Item from './Item';
import OrderCode from './OrderCode';
import OrderCoupon from './OrderCoupon';
import OrderItem from './OrderItem';

export default class Order {
  readonly cpf: CPF;
  readonly code: OrderCode;
  readonly freight: Freight;
  orderItems: Array<OrderItem>;
  coupon?: OrderCoupon;

  constructor(
    readonly rawCpf: string,
    readonly issueDate: Date = new Date(),
    readonly sequence: number = 1,
  ) {
    this.orderItems = [];
    this.code = new OrderCode(this.issueDate, this.sequence);
    this.cpf = new CPF(rawCpf);
    this.freight = new Freight();
  }

  checkItems(item: Item): void {
    if (this.orderItems.some((orderItem) => orderItem.idItem === item.id)) {
      throw new Error('Duplicated item');
    }
  }

  addItem(item: Item, quantity: number): void {
    this.checkItems(item);
    const orderItem = new OrderItem(item.id, item.price, quantity);
    this.orderItems.push(orderItem);
    this.freight.addItem(item, quantity);
  }

  addCoupon(coupon: Coupon): void {
    if (!coupon.isExpired(this.issueDate)) {
      this.coupon = new OrderCoupon(coupon.code, coupon.percentage);
    }
  }

  getFreight() {
    return this.freight.getTotal();
  }

  getTotal(): number {
    let total = this.orderItems.reduce((total, orderItem) => {
      total += orderItem.getTotal();
      return total;
    }, 0);
    if (this.coupon) total -= this.coupon.calculateDiscount(total);
    total += this.freight.getTotal();
    return total;
  }
}
