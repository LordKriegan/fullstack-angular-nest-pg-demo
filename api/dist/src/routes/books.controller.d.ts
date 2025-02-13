import { BooksService } from './books.service';
import { BookEntity as Book } from 'src/entities/book.entity';
import { UpdateBookDTO, LocateBookDTO, SearchBookDTO } from 'src/dtos/book.dtos';
export declare class BooksController {
    private booksService;
    constructor(booksService: BooksService);
    books(): Promise<Book[]>;
    searchBooks({ bookName, author, description, minPages, maxPages }: SearchBookDTO): Promise<Book[]>;
    getBook({ id }: LocateBookDTO): Promise<Book>;
    saveBook({ bookName, author, description, pageCount }: UpdateBookDTO): Promise<Book>;
    updateBook({ id }: LocateBookDTO, { bookName, author, description, pageCount }: UpdateBookDTO): Promise<Book>;
    deleteBook({ id }: LocateBookDTO): Promise<void>;
    populateDb(): Promise<void>;
}
