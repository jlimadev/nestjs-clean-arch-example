import { Module, Provider } from '@nestjs/common';
import GetItems from 'src/application/GetItems';
import {
  databaseProviders,
  PostgresModule,
} from 'src/infra/database/postgres/postgres.module';
import ItemRepositoryDatabase from 'src/infra/repository/database/ItemRepositoryDatabase';
import ItemRepository from '../../../domain/repository/ItemRepository';
import { ItemsController } from './items.controller';

const getItemsProvider: Provider = {
  provide: GetItems,
  useFactory: (itemRepository: ItemRepository) => {
    return new GetItems(itemRepository);
  },
  inject: [ItemRepositoryDatabase],
};

@Module({
  imports: [PostgresModule],
  controllers: [ItemsController],
  providers: [getItemsProvider, ...databaseProviders],
})
export class ItemsModule {}
