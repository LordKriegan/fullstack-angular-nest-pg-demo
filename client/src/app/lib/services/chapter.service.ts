import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subscriber, first } from "rxjs";
import { IChapter } from "../interfaces/chapter.interface";

@Injectable({
    providedIn: 'root'
})
export class ChapterService {
    constructor(
        private http: HttpClient
    ) { }
    
    createChapter(bookId: number, chapterName: string, pageCount: number, description: string): Observable<IChapter> {
        return new Observable((sub: Subscriber<IChapter>) => {
            this.http.post<IChapter>(`/api/chapters`, { chapterName, pageCount, description, bookId })
                .pipe(first())
                .subscribe({
                    next: (chapter: IChapter) => {
                        sub.next(chapter);
                        sub.complete();
                    },
                    error: (error: HttpErrorResponse) => {
                        console.error(error)
                    }
                })
        })
    }

    removeChapter(chapterId: number): Observable<void> {
        return new Observable((sub: Subscriber<void>) => {
            this.http.delete(`/api/chapters/${chapterId}`,)
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

    updateChapter(chapterId: number, chapterName: string, pageCount: number, description: string): Observable<IChapter> {
        return new Observable((sub: Subscriber<IChapter>) => {
            this.http.put<IChapter>(`/api/chapters/${chapterId}`, { chapterName, pageCount, description }).pipe(first()).subscribe({
                next: (response: IChapter) => {
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