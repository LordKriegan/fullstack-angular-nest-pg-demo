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
  readonly authorChipList = signal<IAuthor[]>([]);
  announcer = inject(LiveAnnouncer)

  bookUpdated = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public book: IBook,
    private dialogRef: MatDialogRef<BookDialogComponent>,
    private authorsService: AuthorService
  ) {
    const authorsArray: IAuthor[] = this.book?.authors?.length ? this.book.authors : []
    this.authorChipList.update(() => authorsArray)
    this.bookForm = new FormGroup({
      bookName: new FormControl(this.book?.bookName || '', [Validators.required, Validators.maxLength(50)]),
      authors: new FormControl(authorsArray, [Validators.required]),
      description: new FormControl(book?.description || '', [Validators.required, Validators.maxLength(500)]),
      pageCount: new FormControl(book?.pageCount || 1, [Validators.min(1)])
    })
  }

  async addAuthor(event: MatChipInputEvent) {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      let newAuthor: IAuthor = { author: value }
      if (this.book) {
        let response = await firstValueFrom(this.authorsService.createAuthor(<number>this.book.id, value))
        newAuthor.id = response.id;
      }
      //form control is transforming array of IAuthors into array of strings. need to transform back to IAuthors and preserve the ids as well.
      this.book.authors?.push(newAuthor) || [newAuthor];
      this.authorChipList.update(chips => [...chips, newAuthor]);
      this.announcer.announce(`added ${value} to reactive form`);
      this.bookUpdated = true;
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  async removeAuthor(author: IAuthor) {
    if (this.book && author.id) {
      await firstValueFrom(this.authorsService.removeAuthor(author.id)); 
      const idx = this.book.authors?.findIndex(e => e.id === author.id);
      //form control is transforming array of IAuthors into array of strings. need to transform back to IAuthors and preserve the ids as well.
      this.book.authors?.splice(0, idx);
    }
    this.authorChipList.update(chips => {
      const index = chips.findIndex(chip => chip.author === author.author);
      if (index < 0) {
        return chips;
      }
      this.bookUpdated = true;
      chips.splice(index, 1);
      this.announcer.announce(`removed ${author.author} from reactive form`);
      return [...chips];
    });
  }

  getBook() {
    const book: IBook = this.bookForm.value;
    if (this.book) book.id = this.book.id;
    //form control is transforming array of IAuthors into array of strings. need to transform back to IAuthors and preserve the ids as well.
    book.authors = this.book.authors;
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