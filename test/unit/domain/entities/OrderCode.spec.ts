import OrderCode from '../../../../src/domain/entities/OrderCode';

describe('OrderCode', () => {
  it('should generate an order code', () => {
    const orderCode = new OrderCode(new Date('2022-01-01T22:00:00'), 1);
    expect(orderCode.value).toBe('202200000001');
  });
});
