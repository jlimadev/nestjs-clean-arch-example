import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import Connection from '../../src/infra/database/Connection';
import PgPromiseConnectionAdapter from '../../src/infra/database/PgPromiseConnectionAdapter';
import { AppModule } from './../../src/app.module';

describe('ItemsController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeEach(async () => {
    connection = new PgPromiseConnectionAdapter();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await connection.close();
  });

  it('/items (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/items');
    expect(response.body).toHaveLength(3);
    expect(response.statusCode).toBe(200);
  });
});
