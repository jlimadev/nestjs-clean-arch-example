import Coupon from '../../../../src/domain/entities/Coupon';

describe('coupon', () => {
  it('should return true if coupon is expired', () => {
    const coupon = new Coupon('20OFF', 20, new Date('2020-01-01T10:00:00'));
    expect(coupon.isExpired(new Date('2022-01-01T10:00:00'))).toBeTruthy();
  });
  it('should return false if coupon is not expired', () => {
    const coupon = new Coupon('20OFF', 20, new Date('2022-01-01T10:00:00'));
    expect(coupon.isExpired(new Date('2020-01-01T10:00:00'))).toBeFalsy();
  });
});
