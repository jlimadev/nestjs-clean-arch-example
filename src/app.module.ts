import { Module } from '@nestjs/common';
import { ItemsModule } from './infra/controller/items/items.module';
import { PostgresModule } from './infra/database/postgres/postgres.module';

@Module({
  imports: [ItemsModule, PostgresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
