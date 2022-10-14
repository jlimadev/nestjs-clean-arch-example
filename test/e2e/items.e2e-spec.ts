import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../../src/app.module';
import PgPromiseConnectionAdapter from './../../src/infra/database/PgPromiseConnectionAdapter';

describe('ItemsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    PgPromiseConnectionAdapter.close();
    await app.close();
  });

  it('/items (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/items');
    expect(response.body).toHaveLength(3);
    expect(response.statusCode).toBe(200);
  });
});
