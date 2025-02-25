import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BookEntity } from '../entities/book.entity';
import { ChapterEntity } from '../entities/chapter.entity';

export const dbconfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    password: "admin",
    username: "postgres",
    entities: [BookEntity, ChapterEntity],
    database: "nestAngularLibrary",
    synchronize: true,
    logging: true
  }