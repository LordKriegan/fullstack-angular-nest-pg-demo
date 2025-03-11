import { Body, Controller, Get, Post, Put, Delete, Param, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { BooksService } from './books.service'
import { BookEntity as Book } from 'src/entities/book.entity';
import { UpdateBookDTO, LocateBookDTO, SearchBookDTO } from 'src/dtos/book.dtos';

@Controller('books')
export class BooksController {

  constructor(
      private booksService: BooksService
  ) {}
  @Get()
  async books(
  ): Promise<Book[]> {
       return this.booksService.books()
  }
  @Get('searchBooks')
  async searchBooks(
      @Query() { bookName, author, chapter, description, minPages, maxPages }: SearchBookDTO
  ): Promise<Book[]> {
       return this.booksService.searchBooks(bookName, author, chapter, description, minPages, maxPages)
  }
  @Get(':id')
  async getBook(
      @Param(new ValidationPipe({ transform: true })) { id }: LocateBookDTO
  ): Promise<Book> {
       return this.booksService.getBook(id)
  }
  @Post()
  async saveBook(
      @Body() { bookName, authors, chapters, description, pageCount }: UpdateBookDTO
  ): Promise<Book> {
       return this.booksService.createBook(bookName, authors, chapters, description, pageCount)
  }
  @Put(':id')
  async updateBook(
    @Param(new ValidationPipe({ transform: true })) { id }: LocateBookDTO,
    @Body() { bookName, description, pageCount }: UpdateBookDTO
  ): Promise<Book> {
       return this.booksService.updateBook(id, bookName, description, pageCount)
  }
  @Delete(':id')
  async deleteBook(
    @Param(new ValidationPipe({ transform: true })) { id }: LocateBookDTO
  ): Promise<void> {
       return this.booksService.deleteBook(id)
  }
}