import OrderItem from '../../../../src/domain/entities/OrderItem';

describe('OrderItem', () => {
  it('should create an order item', () => {
    const orderItem = new OrderItem(1, 1000, 2);
    expect(orderItem.getTotal()).toBe(2000);
  });

  it('should throw if quantity is negative', () => {
    expect(() => new OrderItem(1, 1000, -2)).toThrow(new Error('Invalid quantity'));
  });
});
