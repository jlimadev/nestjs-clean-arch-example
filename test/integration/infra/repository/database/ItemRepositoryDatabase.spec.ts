import ItemRepository from '../../../../../src/domain/repository/ItemRepository';
import Connection from '../../../../../src/infra/database/Connection';
import PgPromiseConnectionAdapter from '../../../../../src/infra/database/PgPromiseConnectionAdapter';
import ItemRepositoryDatabase from '../../../../../src/infra/repository/database/ItemRepositoryDatabase';

describe('ItemRepositoryDatabase', () => {
  let connection: Connection;
  let itemRepository: ItemRepository;

  beforeEach(async () => {
    connection = new PgPromiseConnectionAdapter();
    itemRepository = new ItemRepositoryDatabase(connection);
  });

  afterEach(async () => {
    await connection.close();
  });

  it('should get item from database', async () => {
    const items = await itemRepository.getAll();
    expect(items).toHaveLength(3);
  });
  it('should get item by id from database', async () => {
    const idItem = 1;
    const item = await itemRepository.getById(idItem);
    expect(item.description).toBe('Guitarra');
  });
});
