import { Module } from '@nestjs/common';
import { ItemsModule } from './infra/controller/items/items.module';
import { OrdersModule } from './infra/controller/orders/orders.module';
import { PostgresModule } from './infra/database/postgres/postgres.module';

@Module({
  imports: [ItemsModule, OrdersModule, PostgresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
