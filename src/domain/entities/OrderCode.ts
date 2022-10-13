export default class OrderCode {
  value: string;
  constructor(date: Date, sequence: number) {
    this.value = this.generateCode(date, sequence);
  }

  private generateCode(date: Date, sequence: number) {
    const year = date.getFullYear();
    const sequenceNumber = sequence.toString().padStart(8, '0');
    return `${year}${sequenceNumber}`;
  }
}