import Coupon from '../../../domain/entities/Coupon';
import CouponRepository from '../../../domain/repository/CouponRepository';

export default class CouponRepositoryMemory implements CouponRepository {
  coupons: Array<Coupon>;

  constructor() {
    this.coupons = [];
  }

  async save(coupon: Coupon): Promise<void> {
    this.coupons.push(coupon);
  }

  async get(couponCode: string): Promise<Coupon> {
    const coupon = this.coupons.find((coupon) => coupon.code === couponCode);
    if (!coupon) throw new Error(`Coupon ${couponCode} not found`);
    return coupon;
  }
}
