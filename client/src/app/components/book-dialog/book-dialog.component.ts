import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IBook } from '../../lib/interfaces/book.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoreModule } from '../../lib/modules/core.module';
import { IAuthor } from '../../lib/interfaces/author.interface';
import { AuthorService } from '../../lib/services/author.service';
import { ChapterService } from '../../lib/services/chapter.service';
import { IChapter } from '../../lib/interfaces/chapter.interface';
import { ChapterDialogComponent } from '../chapter-dialog/chapter-dialog.component';
import { first } from 'rxjs';

@Component({
  selector: 'app-book-dialog',
  imports: [CoreModule],
  templateUrl: './book-dialog.component.html',
  styleUrl: './book-dialog.component.scss'
})
export class BookDialogComponent {

  book?: IBook | undefined;
  bookForm: FormGroup;

  authorFormControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  authorEditModeIds: number[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public bookData: IBook,
    private dialogRef: MatDialogRef<BookDialogComponent>,
    private dialog: MatDialog,
    private authorsService: AuthorService,
    private chaptersService: ChapterService
  ) {
    this.book = bookData;
    //initializing formgroup here as it may get data from an injected book
    this.bookForm = new FormGroup({
      bookName: new FormControl(this.book?.bookName || '', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl(this.book?.description || '', [Validators.required, Validators.maxLength(500)]),
      pageCount: new FormControl(this.book?.pageCount || 1, [Validators.min(1)])
    })
  }

  handleEditMode(authorId: number) {
    const idx = this.authorEditModeIds.findIndex(e => e === authorId)
    if (idx < 0)
      this.authorEditModeIds.push(authorId);
    else
      this.authorEditModeIds.splice(idx, 1)
  }

  handleUpdateAuthor(authorId: number, input: HTMLInputElement, index: number) {
    if (this.book?.id) { //book exists. means related author exists. update on backend
      this.authorsService.updateAuthor(authorId, input.value).subscribe({
        next: (response: IAuthor) => {
          if (this.book?.authors) this.book.authors[index] = response;
          this.handleEditMode(authorId);
        }
      })
    } else { //book does not exist yet, just need to handle locally
      if (this.book?.authors) this.book.authors[index].author = input.value;
      this.handleEditMode(authorId)
    }
  }

  handleAddAuthor() {
    if (!this.book) this.book = { authors: [], chapters: [] } //if book doesnt exist yet, create a new book in memory with the proper arrays initialized
    if (this.book?.id && this.authorFormControl.valid) { //updating existing book/author
      this.authorsService.createAuthor(this.book.id, <string>this.authorFormControl.value).subscribe({
        next: (response: IAuthor) => {
          if (this.book?.authors) this?.book?.authors.push(response)
          this.authorFormControl.reset()
        }
      })
    } else { //just adding author to array for future creation
      if (this.book?.authors) this.book.authors.push(<IAuthor>{ author: this.authorFormControl.value }) //adding if to avoid typescript errors of potentially undefined books. technically at this point should not be needed
      this.authorFormControl.reset()
    }
  }

  handleRemoveAuthor(authorId: number, index: number) {

    if (this.book?.id) {
      this.authorsService.removeAuthor(authorId).subscribe({
        next: () => {
          this.book?.authors?.splice(index, 1);
        }
      })
    } else {
      this.book?.authors?.splice(index, 1);
    }
  }

  handleUpdateChapter(chapter: IChapter, index: number) {
    const ref = this.dialog.open(ChapterDialogComponent, {
      data: chapter
    })

    ref.afterClosed().pipe(first()).subscribe({
      next: (chapter?: IChapter) => {
        if (chapter) {
          if (this.book?.id) {
            this.chaptersService.updateChapter(<number>chapter.id, chapter.chapterName, chapter.pageCount, chapter.description).pipe(first()).subscribe({
              next: (updatedChapter: IChapter) => {
                if (this.book?.chapters) this.book.chapters[index] = updatedChapter;
              }
            })
          } else {
            if (this.book?.chapters) this.book.chapters[index] = chapter;
          }
        }
      }
    })
  }

  handleAddChapter() {
    if (!this.book) this.book = { authors: [], chapters: [] } //if book doesnt exist yet, create a new book in memory with the proper arrays initialized
    const ref = this.dialog.open(ChapterDialogComponent)
    ref.afterClosed().pipe(first()).subscribe({
      next: (chapter: IChapter) => {
        if (chapter) {
          if (this.book?.id) {
            this.chaptersService.createChapter(this.book.id, chapter.chapterName, chapter.pageCount, chapter.description).pipe(first()).subscribe({
              next: (newChapter: IChapter) => {
                if (this.book?.chapters) this.book?.chapters?.push(newChapter);
              }
            })
          } else {
            if (this.book?.chapters) this.book?.chapters?.push(chapter);
          }
        }
      }
    })
  }

  handleRemoveChapter(chapterId: number, index: number) {
    if (this.book?.id) {
      this.chaptersService.removeChapter(chapterId).subscribe({
        next: () => {
          this.book?.chapters?.splice(index, 1);
        }
      })
    } else {
      this.book?.chapters?.splice(index, 1);
    }
  }

  getBook() {
    const book: IBook = this.bookForm.value;
    book.authors = this.book?.authors || [];
    book.chapters = this.book?.chapters || [];
    if (this.book) book.id = this.book.id;
    return book;
  }

  submitBtn() {
    if (this.bookForm.valid) {
      const newBook: IBook = this.getBook();
      this.dialogRef.close({ bookUpdated: true, newBook });
    } else {
      this.bookForm.markAllAsTouched();
    }
  }
}