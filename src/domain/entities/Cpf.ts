export default class CPF {
  private FACTOR_DIGIT_1 = 10;
  private FACTOR_DIGIT_2 = 11;

  readonly value: string;

  constructor(value: string) {
    if (!this.validate(value)) throw new Error('Invalid CPF');
    this.value = value;
  }

  private validate(cpf: string) {
    if (!cpf) return false;
    cpf = this.cleanCpf(cpf);
    if (!this.isValidLength(cpf)) return false;
    if (this.hasAllDigitsEqual(cpf)) return false;
    const digit1 = this.calculateCheckDigit(cpf, this.FACTOR_DIGIT_1);
    const digit2 = this.calculateCheckDigit(cpf, this.FACTOR_DIGIT_2);
    const checkDigit = this.extractCheckDigit(cpf);
    const calculatedDigit = `${digit1}${digit2}`;
    return checkDigit === calculatedDigit;
  }

  private cleanCpf(cpf: string) {
    return cpf.replace(/[\.\-]/g, '');
  }

  private isValidLength(cpf: string) {
    return cpf.length === 11;
  }

  private hasAllDigitsEqual(cpf: string) {
    const [firstDigit] = cpf;
    return [...cpf].every((digit) => digit === firstDigit);
  }

  private calculateCheckDigit(cpf: string, factor: number) {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  }

  private extractCheckDigit(cpf: string) {
    return cpf.slice(-2);
  }
}
