import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IBook } from '../../lib/interfaces/book.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoreModule } from '../../lib/modules/core.module';

@Component({
  selector: 'app-book-dialog',
  imports: [ CoreModule ],
  templateUrl: './book-dialog.component.html',
  styleUrl: './book-dialog.component.scss'
})
export class BookDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public book: IBook,
    private dialogRef: MatDialogRef<BookDialogComponent>
  ) {
    this.bookForm = new FormGroup({
      bookName: new FormControl(this.book?.bookName || '', [Validators.required, Validators.maxLength(50)]),
      author: new FormControl(book?.author || '', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl(book?.description || '', [Validators.required, Validators.maxLength(500)]),
      pageCount: new FormControl(book?.pageCount || 1, [Validators.min(1)])
    })
  }

    bookForm: FormGroup;

    submitBtn() {
      if (this.bookForm.valid) {
        const newBook: IBook = this.bookForm.value;
        if (this.book) newBook.id = this.book.id;
        this.dialogRef.close(newBook);
      } else {
        this.bookForm.markAllAsTouched();
      }
    }
}