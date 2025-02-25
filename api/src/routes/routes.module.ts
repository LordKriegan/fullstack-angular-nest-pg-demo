import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { ChaptersModule } from './chapters/chapters.module';

@Module({
  imports: [
    BooksModule,
    ChaptersModule
  ]
})
export class RoutesModule {}
