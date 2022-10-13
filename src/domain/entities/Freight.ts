import Item from './Item';

export default class Freight {
  private readonly FIXED_DISTANCE = 1000;
  private readonly MIN_FREIGHT_VALUE = 10;
  private readonly FACTOR = 100;
  total = 0;

  addItem(item: Item, quantity: number): void {
    const freight =
      item.getVolume() *
      this.FIXED_DISTANCE *
      (item.getDensity() / this.FACTOR);
    this.total += freight * quantity;
  }

  getTotal(): number {
    return this.total > 0 && this.total < this.MIN_FREIGHT_VALUE
      ? this.MIN_FREIGHT_VALUE
      : this.total;
  }
}
