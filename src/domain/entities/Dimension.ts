export default class Dimension {
  constructor(
    private readonly width: number,
    private readonly height: number,
    private readonly length: number,
  ) {
    if (width < 0 || height < 0 || length < 0)
      throw new Error('Invalid dimension');
  }

  getVolume(): number {
    return (this.height / 100) * (this.width / 100) * (this.length / 100);
  }
}
