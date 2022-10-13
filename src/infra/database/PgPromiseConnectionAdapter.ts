import pgp from 'pg-promise';
import Connection from './Connection';

export default class PgPromiseConnectionAdapter implements Connection {
  client: any;

  constructor() {
    this.client = pgp()('postgres://postgres:postgres@localhost:5432/postgres');
  }

  query(statement: string, params: any): Promise<unknown> {
    return this.client.query(statement, params);
  }

  close(): Promise<void> {
    return this.client.$pool.end();
  }
}
