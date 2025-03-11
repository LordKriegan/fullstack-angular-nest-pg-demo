import { Component, Inject, inject, signal } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IBook } from '../../lib/interfaces/book.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoreModule } from '../../lib/modules/core.module';
import { IAuthor } from '../../lib/interfaces/author.interface';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthorService } from '../../lib/services/author.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-book-dialog',
  imports: [CoreModule],
  templateUrl: './book-dialog.component.html',
  styleUrl: './book-dialog.component.scss'
})
export class BookDialogComponent {

  bookForm: FormGroup;
  bookUpdated = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public book: IBook,
    private dialogRef: MatDialogRef<BookDialogComponent>,
    private authorsService: AuthorService
  ) {
    this.bookForm = new FormGroup({
      bookName: new FormControl(this.book?.bookName || '', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl(book?.description || '', [Validators.required, Validators.maxLength(500)]),
      pageCount: new FormControl(book?.pageCount || 1, [Validators.min(1)])
    })
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
      this.dialogRef.close({bookUpdated: this.bookUpdated, newBook });
    } else {
      this.bookForm.markAllAsTouched();
    }
  }
}