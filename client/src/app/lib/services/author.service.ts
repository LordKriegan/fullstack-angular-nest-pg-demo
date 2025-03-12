import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subscriber, first } from "rxjs";
import { IAuthor } from "../interfaces/author.interface";

@Injectable({
    providedIn: 'root'
})
export class AuthorService {
    constructor(
        private http: HttpClient
    ) { }
    
    createAuthor(bookId: number, author: string): Observable<IAuthor> {
        return new Observable((sub: Subscriber<IAuthor>) => {
            this.http.post<IAuthor>(`/api/authors/${bookId}`, { author })
                .pipe(first())
                .subscribe({
                    next: (author: IAuthor) => {
                        sub.next(author);
                        sub.complete();
                    },
                    error: (error: HttpErrorResponse) => {
                        console.error(error)
                    }
                })
        })
    }

    removeAuthor(authorId: number): Observable<void> {
        return new Observable((sub: Subscriber<void>) => {
            this.http.delete(`/api/authors/${authorId}`,)
                .pipe(first())
                .subscribe({
                    next: () => {
                        sub.next();
                        sub.complete();
                    },
                    error: (error: HttpErrorResponse) => {
                        console.error(error)
                    }
                })
        })
    }

    updateAuthor(authorId: number, author: string): Observable<IAuthor> {
        return new Observable((sub: Subscriber<IAuthor>) => {
            this.http.put<IAuthor>(`/api/authors/${authorId}`, { author }).pipe(first()).subscribe({
                next: (response: IAuthor) => {
                    sub.next(response);
                    sub.complete();
                },
                error: (error: HttpErrorResponse) => {
                    console.error(error);
                }
            })
        })
    }
}