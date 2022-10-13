import Coupon from '../../src/domain/entities/Coupon';
import CouponRepository from '../../src/domain/repository/CouponRepository';

type CouponHelperInput = {
  couponRepository: CouponRepository;
  expireDate: Date;
};

export const addCouponToDatabase = async (
  input: CouponHelperInput,
): Promise<void> => {
  const coupon = new Coupon('20OFF', 20, input.expireDate);
  await input.couponRepository.save(coupon);
};
