import { BooksService } from './books.service';
export declare class BooksController {
    private booksService;
    constructor(booksService: BooksService);
    books(): Promise<string>;
    searchBooks(bookName: any, author: any, minPages: any, maxPages: any): Promise<string>;
    getBook(id: any): Promise<string>;
    saveBook(bookName: any, author: any, pageCount: any): Promise<string>;
    updateBook(bookName: any, author: any, pageCount: any): Promise<string>;
    deleteBook(id: any): Promise<string>;
}
