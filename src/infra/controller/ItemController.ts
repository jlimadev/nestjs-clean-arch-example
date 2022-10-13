import GetItems from '../../application/GetItems';
import ItemRepository from '../../domain/repository/ItemRepository';
import Http from '../http/Http';

export default class ItemController {
  constructor(
    private readonly http: Http,
    private readonly itemRepository: ItemRepository,
  ) {
    this.http.on('get', '/items', async (params: unknown, body: unknown) => {
      const getItems = new GetItems(this.itemRepository);
      const output = await getItems.execute();
      return output;
    });
  }
}
