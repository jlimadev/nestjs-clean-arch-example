import Coupon from '../../../../src/domain/entities/Coupon';
import OrderCoupon from '../../../../src/domain/entities/OrderCoupon';

describe('coupon', () => {
  it('should create a coupom', () => {
    const coupon = new Coupon('20OFF', 20, new Date('2022-01-01T10:00:00'));
    const orderCoupon = new OrderCoupon(coupon.code, coupon.percentage);
    const discount = orderCoupon.calculateDiscount(100);
    expect(discount).toBe(20);
  });
});
