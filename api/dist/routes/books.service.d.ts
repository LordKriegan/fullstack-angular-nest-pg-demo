export declare class BooksService {
    books(): string;
    searchBooks(bookName: any, author: any, minPages: any, maxPages: any): string;
    getBook(id: any): string;
    saveBook(bookName: any, author: any, pageCount: any): string;
    updateBook(bookName: any, author: any, pageCount: any): string;
    deleteBook(id: any): string;
}
