import { Module, Provider } from '@nestjs/common';
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

export const databaseProviders = [
  postgresAdapter,
  itemRepositoryDatabaseProvider,
];

@Module({
  providers: databaseProviders,
})
export class PostgresModule {}
