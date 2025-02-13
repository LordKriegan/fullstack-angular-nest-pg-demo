import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subscriber, first } from "rxjs";
import { IBook } from "../interfaces/book.interface";
import { IBookSearchOptions } from "../interfaces/bookSearchOptions.interface";

@Injectable({
    providedIn: 'root'
})
export class BookService {
    constructor(
        private http: HttpClient
    ) {}

    getBooks(): Observable<IBook[]> {
        return new Observable((sub: Subscriber<IBook[]>) => {
            this.http.get<IBook[]>('/api/books').pipe(first()).subscribe({
                next: (books: IBook[]) => {
                    sub.next(books);
                    sub.complete();
                },
                error: (error: HttpErrorResponse) => {
                    sub.error(error);
                }
            })
        })
    }

    getSingleBook(id: number): Observable<IBook> {
        return new Observable((sub: Subscriber<IBook>) => {
            this.http.get<IBook>(`/api/books/${id}`).pipe(first()).subscribe({
                next: (book: IBook) => {
                    sub.next(book);
                    sub.complete();
                },
                error: (error: HttpErrorResponse) => {
                    console.error(error);
                    sub.error(error);
                }
            })
        })
    }

    deleteBook(id: number): Observable<void> {
        return new Observable(sub => {
            this.http.delete(`/api/books/${id}`).pipe(first()).subscribe({
                next: () => {
                    sub.next();
                    sub.complete();
                },
                error: (error) => {
                    console.error(error);
                    sub.error(error);
                }
            })
        })
    }

    updateBook(book: IBook): Observable<IBook> {
        return new Observable((sub: Subscriber<IBook>) => {
            this.http.put<IBook>(`/api/books/${book.id}`, book).pipe(first()).subscribe({
                next: (updatedBook: IBook) => {
                    sub.next(updatedBook);
                    sub.complete();
                },
                error: (error: HttpErrorResponse) => {
                    console.error(error);
                    sub.error(error);
                }
            })
        })
    }

    createBook(book: IBook): Observable<IBook> {
        return new Observable((sub: Subscriber<IBook>) => {
            this.http.post('/api/books', book).pipe(first()).subscribe({
                next: (newBook: IBook) => {
                    sub.next(newBook);
                    sub.complete();
                },
                error: (error: HttpErrorResponse) => {
                    console.error(error);
                    sub.error(error);
                }
            })
        })
    }

    advancedSearch(searchTerms: IBookSearchOptions): Observable<IBook[]> {
        return new Observable((sub: Subscriber<IBook[]>) => {
            this.http.get<IBook[]>('/api/books/searchBooks', { params: new HttpParams({ fromObject: <{[name:string]: string | number}>searchTerms}) }).pipe(first()).subscribe({
                next: (books: IBook[]) => {
                    sub.next(books);
                    sub.complete();
                },
                error: (error: HttpErrorResponse) => {
                    console.error(error);
                    sub.error(error);
                }
            })
        })
    }
}