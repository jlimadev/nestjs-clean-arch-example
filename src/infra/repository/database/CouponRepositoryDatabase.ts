import Coupon from '../../../domain/entities/Coupon';
import CouponRepository from '../../../domain/repository/CouponRepository';
import Connection from '../../database/Connection';

export default class CouponRepositoryDatabase implements CouponRepository {
  constructor(private readonly connection: Connection) {}

  async save(coupon: Coupon): Promise<void> {
    await this.connection.query(
      `insert into ccca.coupon (code, percentage, expire_date)
       values ($1, $2, $3)`,
      [coupon.code, coupon.percentage, coupon.expirationDate],
    );
  }

  async get(couponCode: string): Promise<Coupon> {
    const [couponData] = await this.connection.query(
      `select * from ccca.coupon where code = $1`,
      [couponCode],
    );
    if (!couponData) throw new Error(`Coupon ${couponCode} not found`);
    const coupon = new Coupon(
      couponData.code,
      couponData.percentage,
      couponData.expiration_date,
    );
    return coupon;
  }
}
