import GetItems from '../../../src/application/GetItems';
import ItemRepositoryMemory from '../../../src/infra/repository/memory/ItemRepositoryMemory';
import { addItemsToDatabase } from '../../utils/CreateItems';

describe('GetItems', () => {
  const itemRepository = new ItemRepositoryMemory();
  beforeAll(async () => {
    await addItemsToDatabase(itemRepository);
  });
  it('it should get the items', async () => {
    const getItems = new GetItems(itemRepository);
    const output = await getItems.execute();
    expect(output).toHaveLength(3);
  });
});
