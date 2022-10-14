import pgp from 'pg-promise';
import Connection from './Connection';

export default class PgPromiseConnectionAdapter implements Connection {
  private static client: any;

  constructor() {
    PgPromiseConnectionAdapter.client = pgp()(
      'postgres://postgres:postgres@localhost:5432/postgres',
    );
  }

  query(statement: string, params: any): Promise<unknown> {
    return PgPromiseConnectionAdapter.client.query(statement, params);
  }

  close(): Promise<void> {
    return PgPromiseConnectionAdapter.client.$pool.end();
  }

  static close(): Promise<void> {
    return PgPromiseConnectionAdapter.client.$pool.end();
  }
}
