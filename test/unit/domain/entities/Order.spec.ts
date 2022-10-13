import Coupon from '../../../../src/domain/entities/Coupon';
import Order from '../../../../src/domain/entities/Order';
import { createItems, createItemsWithDimension } from '../../../utils/CreateItems';

describe('order', () => {
  it('should place an order', () => {
    const cpf = '935.411.347-80';
    const order = new Order(cpf);
    const [firstItem, secondItem, thirdItem] = createItems();
    order.addItem(firstItem, 1);
    order.addItem(secondItem, 1);
    order.addItem(thirdItem, 3);
    const total = order.getTotal();
    expect(total).toBe(6090);
  });
  it('should place an order with a discount coupon', () => {
    const cpf = '935.411.347-80';
    const order = new Order(cpf);
    const [firstItem, secondItem, thirdItem] = createItems();
    order.addItem(firstItem, 1);
    order.addItem(secondItem, 1);
    order.addItem(thirdItem, 3);
    const coupon = new Coupon('20OFF', 20);
    order.addCoupon(coupon);
    const total = order.getTotal();
    expect(total).toBe(4872);
  });
  it('should not apply expired discount coupon when place an order', () => {
    const cpf = '935.411.347-80';
    const order = new Order(cpf);
    const [firstItem, secondItem, thirdItem] = createItems();
    order.addItem(firstItem, 1);
    order.addItem(secondItem, 1);
    order.addItem(thirdItem, 3);
    const coupon = new Coupon('20OFF', 20, new Date('2021-01-01T10:00:00'));
    order.addCoupon(coupon);
    const total = order.getTotal();
    expect(total).toBe(6090);
  });
  it('should place an order and calculate freight', () => {
    const cpf = '935.411.347-80';
    const order = new Order(cpf);
    const [firstItem, secondItem, thirdItem] = createItemsWithDimension();
    order.addItem(firstItem, 1);
    order.addItem(secondItem, 1);
    order.addItem(thirdItem, 3);
    const total = order.getTotal();
    expect(total).toBe(6350);
  });
  it('should place an order with order code YYYYOOOOOOOO', () => {
    const cpf = '935.411.347-80';
    const order = new Order(cpf, new Date('2022-01-01T10:00:00'));
    expect(order.code.value).toBe('202200000001');
  });
  it('should place an order', () => {
    const cpf = '935.411.347-80';
    const order = new Order(cpf);
    const [firstItem] = createItems();
    order.addItem(firstItem, 1);
    expect(() => order.addItem(firstItem, 1)).toThrow(new Error('Duplicated item'));
  });
});
