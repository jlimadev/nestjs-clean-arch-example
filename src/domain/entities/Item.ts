import Dimension from './Dimension';

export default class Item {
  constructor(
    readonly id: number,
    readonly category: string,
    readonly description: string,
    readonly price: number,
    readonly dimension?: Dimension,
    readonly weight?: number,
  ) {
    if (weight && weight < 0) throw new Error('Invalid weight');
  }

  getVolume(): number {
    return this.dimension ? this.dimension.getVolume() : 0;
  }

  getDensity(): number {
    if (this.weight && this.dimension) {
      return this.weight / this.dimension.getVolume();
    }
    return 0;
  }
}
