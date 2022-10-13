import CPF from '../../../../src/domain/entities/Cpf';

describe('CPF', () => {
  it('should throw an error when CPF is invalid', () => {
    const input = '123.456.789-10';
    expect(() => new CPF(input)).toThrow('Invalid CPF');
  });
  it('should throw an error when CPF has digits equal', () => {
    const input = '111.111.111-11';
    expect(() => new CPF(input)).toThrow('Invalid CPF');
  });
  it('should create a valid CPF', () => {
    const cpf = new CPF('935.411.347-80');
    expect(cpf.value).toBe('935.411.347-80');
  });
});
