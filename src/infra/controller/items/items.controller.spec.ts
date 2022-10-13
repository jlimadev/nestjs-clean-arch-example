import { Test, TestingModule } from '@nestjs/testing';
import { databaseProviders } from '../../../infra/database/postgres/postgres.module';
import { ItemsController } from './items.controller';
import { getItemsProviders } from './items.module';

describe('ItemsController', () => {
  let controller: ItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [...getItemsProviders, ...databaseProviders],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
