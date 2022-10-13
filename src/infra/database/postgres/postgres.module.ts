import { Module, Provider } from '@nestjs/common';
import OrderRepositoryDatabase from 'src/infra/repository/database/OrderRepositoryDatabase';
import ItemRepositoryDatabase from '../../../infra/repository/database/ItemRepositoryDatabase';
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
})
export class PostgresModule {}
