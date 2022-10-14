import { Module, Provider } from '@nestjs/common';
import ItemRepositoryDatabase from '../../../infra/repository/database/ItemRepositoryDatabase';
import OrderRepositoryDatabase from '../../../infra/repository/database/OrderRepositoryDatabase';
import Connection from '../Connection';
import PgPromiseConnectionAdapter from '../PgPromiseConnectionAdapter';

const postgresAdapter: Provider = {
  provide: PgPromiseConnectionAdapter,
  useClass: PgPromiseConnectionAdapter,
};

const itemRepositoryDatabaseProvider: Provider = {
  provide: ItemRepositoryDatabase,
  useFactory: (connection: Connection) => {
    return new ItemRepositoryDatabase(connection);
  },
  inject: [PgPromiseConnectionAdapter],
};

const orderRepositoryDatabaseProvider: Provider = {
  provide: OrderRepositoryDatabase,
  useFactory: (connection: Connection) => {
    return new OrderRepositoryDatabase(connection);
  },
  inject: [PgPromiseConnectionAdapter],
};

export const databaseProviders = [
  postgresAdapter,
  itemRepositoryDatabaseProvider,
  orderRepositoryDatabaseProvider,
];

@Module({
  providers: databaseProviders,
  exports: databaseProviders,
})
export class PostgresModule {}
