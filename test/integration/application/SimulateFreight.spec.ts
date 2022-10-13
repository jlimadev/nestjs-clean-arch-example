import SimulateFreight from '../../../src/application/SimulateFreight';
import ItemRepositoryMemory from '../../../src/infra/repository/memory/ItemRepositoryMemory';
import { addItemsToDatabase } from '../../utils/CreateItems';

describe('SimulateFreight', () => {
  it('should simulate the freight', async () => {
    const itemRepository = new ItemRepositoryMemory();
    const simulateFreight = new SimulateFreight(itemRepository);
    await addItemsToDatabase(itemRepository);
    const input = {
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
    };
    const output = await simulateFreight.execute(input);
    expect(output.total).toBe(260);
  });
});
