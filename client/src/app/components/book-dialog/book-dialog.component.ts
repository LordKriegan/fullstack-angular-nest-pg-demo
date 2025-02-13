import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IBook } from '../../lib/interfaces/book.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-book-dialog',
  imports: [
    MatButtonModule, 
    MatDialogModule, 
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
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