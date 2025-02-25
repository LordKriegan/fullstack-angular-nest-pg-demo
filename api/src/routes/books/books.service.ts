import { HttpException, Injectable } from '@nestjs/common';
import { Repository, LessThanOrEqual, MoreThanOrEqual, FindOptionsWhere, Between, Like } from 'typeorm';
import { BookEntity as Book } from 'src/entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>
  ) { }

  async books(): Promise<Book[]> {
    return this.bookRepository.find();
  }
  async searchBooks(bookName?: string, author?: string, description?: string, minPages?: number, maxPages?: number): Promise<Book[]> {
    
    //as this is a non-trivial search, we need to use TypeORM's Query Builder to perform a more complex search.
    const findOptions: FindOptionsWhere<Book> = {}

    if (bookName) { //add bookName if exists
      findOptions.bookName = Like(`%${bookName}%`);
    }

    if (author) { //add author if exists
      findOptions.author = Like(`%${author}%`);
    }

    if (description) { //add description if exists
      findOptions.description = Like(`%${description}%`)
    }

    //add minPages and/or maxPages if exists. Need to create a different type of query depending on combination
    //need to check for 0 to exclude it from other falsy values
    if ((minPages === 0 || minPages) && (!maxPages && maxPages !== 0)) {// only minPages exists
      findOptions.pageCount = MoreThanOrEqual(minPages);
    } else if ((maxPages === 0 || maxPages) && (!minPages && minPages !== 0)) { // only maxPages exists
      findOptions.pageCount = LessThanOrEqual(maxPages);
    } else if (maxPages && minPages) { // both min and maxpages exist and are nonzero/null
      findOptions.pageCount = Between(<number>minPages, <number>maxPages); //have to cast minPages/maxPages to numbers since they are optional paremeters, TS sees it as possibly undefined which is a type mismatch with the find option
    }

    return  this.bookRepository.findBy(findOptions)
  }
  async getBook(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['chapters']
    });
    if (!book) {
      throw new HttpException('Book not found!', 404)
    }
    return book;
  }
  async createBook(bookName: string, author: string, description: string, pageCount: number): Promise<Book> {
    const newBook = this.bookRepository.create({ bookName, author, description, pageCount });
    return this.bookRepository.save(newBook);
  }
  async updateBook(id: number, bookName: string, author: string, description: string, pageCount: number): Promise<Book> {
    const book = this.bookRepository.create({ id, bookName, author, description, pageCount });
    return this.bookRepository.save(book);
  }
  async deleteBook(id: number): Promise<void> {
    this.bookRepository.delete({ id })
  }
}