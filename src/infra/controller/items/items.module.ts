import { Module, Provider } from '@nestjs/common';
import GetItems from '../../../application/GetItems';
import ItemRepository from '../../../domain/repository/ItemRepository';
import { PostgresModule } from '../../../infra/database/postgres/postgres.module';
import ItemRepositoryDatabase from '../../../infra/repository/database/ItemRepositoryDatabase';
import { ItemsController } from './items.controller';

const getItemsProvider: Provider = {
  provide: GetItems,
  useFactory: (itemRepository: ItemRepository) => {
    return new GetItems(itemRepository);
  },
  inject: [ItemRepositoryDatabase],
};

export const getItemsProviders = [getItemsProvider];

@Module({
  imports: [PostgresModule],
  controllers: [ItemsController],
  providers: getItemsProviders,
  exports: getItemsProviders,
})
export class ItemsModule {}
