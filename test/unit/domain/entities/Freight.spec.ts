import Dimension from '../../../../src/domain/entities/Dimension';
import Freight from '../../../../src/domain/entities/Freight';
import Item from '../../../../src/domain/entities/Item';

describe('freight', () => {
  it('should return the min value when freight total is lower than 10', () => {
    const freight = new Freight();
    const dimension = new Dimension(20, 15, 10);
    const item = new Item(1, 'Equipment', 'Camera', 500, dimension, 0.5);
    freight.addItem(item, 1);
    // this freight would be 5
    expect(freight.getTotal()).toBe(10);
  });
  it('should calculate the item freight', () => {
    const freight = new Freight();
    const dimension = new Dimension(100, 30, 10);
    const item = new Item(1, 'Equipment', 'Big Camera', 1500, dimension, 3);
    freight.addItem(item, 2);
    expect(freight.getTotal()).toBe(60);
  });
});
