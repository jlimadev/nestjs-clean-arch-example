import { Module, Provider } from '@nestjs/common';
import GetOrder from '../../../application/GetOrder';
import GetOrders from '../../../application/GetOrders';
import OrderRepository from '../../../domain/repository/OrderRepository';
import {
  databaseProviders,
  PostgresModule,
} from '../../../infra/database/postgres/postgres.module';
import OrderRepositoryDatabase from '../../../infra/repository/database/OrderRepositoryDatabase';
import { OrdersController } from './orders.controller';

const getOrderProvider: Provider = {
  provide: GetOrder,
  useFactory: (orderRepository: OrderRepository) => {
    return new GetOrder(orderRepository);
  },
  inject: [OrderRepositoryDatabase],
};

const getOrdersProvider: Provider = {
  provide: GetOrders,
  useFactory: (orderRepository: OrderRepository) => {
    return new GetOrders(orderRepository);
  },
  inject: [OrderRepositoryDatabase],
};

export const getOrdersProviders = [getOrderProvider, getOrdersProvider];

@Module({
  imports: [PostgresModule],
  controllers: [OrdersController],
  providers: [...getOrdersProviders, ...databaseProviders],
})
export class OrdersModule {}
