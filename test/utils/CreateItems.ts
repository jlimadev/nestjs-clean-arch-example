import Dimension from '../../src/domain/entities/Dimension';
import Item from '../../src/domain/entities/Item';
import ItemRepository from '../../src/domain/repository/ItemRepository';

export const createItems = (): Array<Item> => {
  const items = [
    new Item(1, 'Instrumentos Musicais', 'Guitarra', 1000),
    new Item(2, 'Instrumentos Musicais', 'Amplificador', 5000),
    new Item(3, 'Instrumentos Musicais', 'Cabo', 30),
  ];
  return items;
};

export const createItemsWithDimension = (): Array<Item> => {
  const items = [
    new Item(
      1,
      'Instrumentos Musicais',
      'Guitarra',
      1000,
      new Dimension(100, 30, 10),
      3,
    ),
    new Item(
      2,
      'Instrumentos Musicais',
      'Amplificador',
      5000,
      new Dimension(100, 50, 50),
      20,
    ),
    new Item(
      3,
      'Instrumentos Musicais',
      'Cabo',
      30,
      new Dimension(10, 10, 10),
      1,
    ),
  ];
  return items;
};

export const addItemsToDatabase = async (
  itemRepository: ItemRepository,
): Promise<void> => {
  const items = createItemsWithDimension();
  for (const item of items) {
    await itemRepository.save(item);
  }
};
