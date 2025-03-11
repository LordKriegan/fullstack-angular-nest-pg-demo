import { HttpException, Injectable } from '@nestjs/common';
import { Repository, LessThanOrEqual, MoreThanOrEqual, FindOptionsWhere, Between, Like, ArrayContains, FindManyOptions, FindOneOptions } from 'typeorm';
import { BookEntity as Book } from '../../entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateChapterDTO } from '../../dtos/chapters.dtos';
import { AuthorEntity as Author } from 'src/entities/author.entity';
import { ChapterEntity as Chapter } from 'src/entities/chapter.entity';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author) private readonly authorRepository: Repository<Author>,
    @InjectRepository(Chapter) private readonly chapterRepository: Repository<Chapter>,
  ) { }

  async books(): Promise<Book[]> {
    return this.bookRepository.find({ relations: { authors: true, chapters: true }});
  }
  async searchBooks(bookName?: string, author?: string, chapter?: string, description?: string, minPages?: number, maxPages?: number): Promise<Book[]> {

    //as this is a non-trivial search, we need to use TypeORM's Query Builder to perform a more complex search.
    let findOptions: FindManyOptions<Book> = {
      relations: { authors: true, chapters: true },
      where: {}
    }
    let findOptionsWhere: FindOptionsWhere<Book> = {};
    if (bookName) { //add bookName if exists
      findOptionsWhere.bookName = Like(`%${bookName}%`);
    }

    if (author) { //add author if exists
      findOptionsWhere.authors = { author: Like(`%${author}%`)}
    }

    if (chapter) { //add author if exists
      findOptionsWhere.chapters = { chapterName: Like(`%${chapter}%`)}
    }

    if (description) { //add description if exists
      findOptionsWhere.description = Like(`%${description}%`)
    }

    //add minPages and/or maxPages if exists. Need to create a different type of query depending on combination
    //need to check for 0 to exclude it from other falsy values
    if ((minPages === 0 || minPages) && (!maxPages && maxPages !== 0)) {// only minPages exists
      findOptionsWhere.pageCount = MoreThanOrEqual(minPages);
    } else if ((maxPages === 0 || maxPages) && (!minPages && minPages !== 0)) { // only maxPages exists
      findOptionsWhere.pageCount = LessThanOrEqual(maxPages);
    } else if (maxPages && minPages) { // both min and maxpages exist and are nonzero/null
      findOptionsWhere.pageCount = Between(<number>minPages, <number>maxPages); //have to cast minPages/maxPages to numbers since they are optional paremeters, TS sees it as possibly undefined which is a type mismatch with the find option
    }

    findOptions.where = findOptionsWhere
    return this.bookRepository.find(findOptions)
  }

  async getBook(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: { authors: true, chapters: true }
    });
    if (!book) {
      throw new HttpException('Book not found!', 404)
    }
    return book;
  }

  async createBook(bookName: string, authors: string[], chapters: UpdateChapterDTO[], description: string, pageCount: number): Promise<Book> {
    const newBook = this.bookRepository.create({
      bookName, pageCount, description
    });

    const savedBook = await this.bookRepository.save(newBook);

    for (let i = 0; i < authors.length; i++) {
      const newAuthor = this.authorRepository.create({
        book: savedBook,
        author: authors[i]
      })
      await this.authorRepository.save(newAuthor);
    }

    for (let i = 0; i < chapters.length; i++) {
      const newChapter = this.chapterRepository.create({
        book: savedBook,
        ...chapters[i]
      })
      await this.chapterRepository.save(newChapter);
    }

    return savedBook
  }
  async updateBook(id: number, bookName: string, description: string, pageCount: number): Promise<Book> {
    const book = this.bookRepository.create({ id, bookName, description, pageCount });
    return this.bookRepository.save(book);
  }
  async deleteBook(id: number): Promise<void> {
    this.bookRepository.delete({ id })
  }
}