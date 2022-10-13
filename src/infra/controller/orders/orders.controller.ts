import { Controller, Get, Param } from '@nestjs/common';
import GetOrder from '../../../application/GetOrder';
import GetOrders from '../../../application/GetOrders';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly getOrder: GetOrder,
    private readonly getOrders: GetOrders,
  ) {}

  @Get()
  async findAll() {
    return await this.getOrders.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.getOrder.execute(id);
  }
}
