import CouponRepository from '../domain/repository/CouponRepository';

type ValidateCouponInput = {
  couponCode: string;
  date: Date;
};

type ValidateCouponOutput = {
  isExpired: boolean;
};

export default class ValidateCoupon {
  constructor(private readonly couponRepository: CouponRepository) {}

  async execute(input: ValidateCouponInput): Promise<ValidateCouponOutput> {
    const coupon = await this.couponRepository.get(input.couponCode);
    const isExpired = coupon.isExpired(input.date);
    return { isExpired };
  }
}
