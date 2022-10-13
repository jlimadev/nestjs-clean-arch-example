export default interface Http {
  listen(port: number): void;
  on(method: string, url: string, callback: Function): void;
}
