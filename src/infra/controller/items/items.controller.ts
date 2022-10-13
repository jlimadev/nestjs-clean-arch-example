import { Controller, Get } from '@nestjs/common';
import GetItems from '../../../application/GetItems';

@Controller('items')
export class ItemsController {
  constructor(private readonly getItems: GetItems) {}

  @Get()
  async findAll() {
    return await this.getItems.execute();
  }
}
