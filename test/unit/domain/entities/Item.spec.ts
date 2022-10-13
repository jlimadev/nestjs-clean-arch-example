import Dimension from '../../../../src/domain/entities/Dimension';
import Item from '../../../../src/domain/entities/Item';

describe('item', () => {
  it('should return the item volume', () => {
    const dimension = new Dimension(20, 15, 10);
    const item = new Item(1, 'Equipment', 'Camera', 500, dimension, 0.5);
    expect(item.getVolume()).toBe(0.003);
  });
  it('should return volume zero when the item has no information about dimensions', () => {
    const item = new Item(1, 'Equipment', 'Camera', 500);
    expect(item.getVolume()).toBe(0);
  });
  it('should return item density', () => {
    const dimension = new Dimension(20, 15, 10);
    const item = new Item(1, 'Equipment', 'Camera', 500, dimension, 1);
    expect(+item.getDensity().toFixed()).toBe(333);
  });
  it('should return density zero when the item has no information about dimensions', () => {
    const item = new Item(1, 'Equipment', 'Camera', 500);
    expect(item.getDensity()).toBe(0);
  });
  it('should thrown an exception if weight is invalid', () => {
    const dimension = new Dimension(20, 15, 10);
    expect(() => new Item(1, 'Equipment', 'Camera', 500, dimension, -5)).toThrow(
      new Error('Invalid weight'),
    );
  });
});
