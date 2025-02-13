import { Repository } from 'typeorm';
import { BookEntity as Book } from 'src/entities/book.entity';
export declare class BooksService {
    private readonly bookRepository;
    constructor(bookRepository: Repository<Book>);
    books(): Promise<Book[]>;
    searchBooks(bookName?: string, author?: string, description?: string, minPages?: number, maxPages?: number): Promise<Book[]>;
    getBook(id: number): Promise<Book>;
    createBook(bookName: string, author: string, description: string, pageCount: number): Promise<Book>;
    updateBook(id: number, bookName: string, author: string, description: string, pageCount: number): Promise<Book>;
    deleteBook(id: number): Promise<void>;
    populateDb(): Promise<void>;
}
