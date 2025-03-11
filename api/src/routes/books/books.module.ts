import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity as Book } from 'src/entities/book.entity';
import { AuthorEntity as Author } from 'src/entities/author.entity';
import { ChapterEntity as Chapter } from 'src/entities/chapter.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Book, Author, Chapter])],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
