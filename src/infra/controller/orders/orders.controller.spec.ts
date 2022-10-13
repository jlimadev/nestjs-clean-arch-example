import { Test, TestingModule } from '@nestjs/testing';
import { databaseProviders } from '../../../infra/database/postgres/postgres.module';
import { OrdersController } from './orders.controller';
import { getOrdersProviders } from './orders.module';

describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [...getOrdersProviders, ...databaseProviders],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
