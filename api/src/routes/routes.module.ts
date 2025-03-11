import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { ChaptersModule } from './chapters/chapters.module';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [
    BooksModule,
    ChaptersModule,
    AuthorsModule
  ]
})
export class RoutesModule {}
