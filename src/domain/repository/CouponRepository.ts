import Coupon from '../entities/Coupon';

export default interface CouponRepository {
  save(coupon: Coupon): Promise<void>;
  get(coupon: string): Promise<Coupon>;
}
