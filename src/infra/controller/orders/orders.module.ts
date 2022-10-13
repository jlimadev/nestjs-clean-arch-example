import { Module, Provider } from '@nestjs/common';
import GetOrder from 'src/application/GetOrder';
import GetOrders from 'src/application/GetOrders';
import OrderRepository from 'src/domain/repository/OrderRepository';
import OrderRepositoryDatabase from 'src/infra/repository/database/OrderRepositoryDatabase';
import {
  databaseProviders,
  PostgresModule,
} from '../../../infra/database/postgres/postgres.module';
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
