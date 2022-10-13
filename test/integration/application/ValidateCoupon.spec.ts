import ValidateCoupon from '../../../src/application/ValidateCoupon';
import CouponRepositoryMemory from '../../../src/infra/repository/memory/CouponRepositoryMemory';
import { addCouponToDatabase } from '../../utils/CreateCoupons';

describe('ValidateCoupon', () => {
  it('should validate a valid coupon', async () => {
    const couponRepository = new CouponRepositoryMemory();
    const validateCoupon = new ValidateCoupon(couponRepository);
    await addCouponToDatabase({ couponRepository, expireDate: new Date('2022-01-01T10:00:00') });
    const input = { couponCode: '20OFF', date: new Date('2021-01-01T10:00:00') };
    const output = await validateCoupon.execute(input);
    expect(output.isExpired).toBeFalsy();
  });
  it('should validate a expired coupon', async () => {
    const couponRepository = new CouponRepositoryMemory();
    const validateCoupon = new ValidateCoupon(couponRepository);
    await addCouponToDatabase({ couponRepository, expireDate: new Date('2021-01-01T10:00:00') });
    const input = { couponCode: '20OFF', date: new Date('2022-01-01T10:00:00') };
    const output = await validateCoupon.execute(input);
    expect(output.isExpired).toBeTruthy();
  });
});
