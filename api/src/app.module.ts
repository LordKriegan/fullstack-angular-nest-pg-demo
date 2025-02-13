import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoutesModule } from './routes/routes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      password: "admin",
      username: "postgres",
      entities: [BookEntity],
      database: "nestAngularLibrary",
      synchronize: true,
      logging: true
    }),
    RoutesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
