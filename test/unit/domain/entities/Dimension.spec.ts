import Dimension from '../../../../src/domain/entities/Dimension';

describe('dimension', () => {
  it('should return the dimension volume', () => {
    const dimension = new Dimension(20, 15, 10);
    expect(dimension.getVolume()).toBe(0.003);
  });
  it('should throw an error if dimension is invalid', () => {
    expect(() => new Dimension(-20, -15, -10)).toThrow(new Error('Invalid dimension'));
  });
});
