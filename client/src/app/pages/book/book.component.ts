import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BookService } from '../../lib/services/book.service';
import { IBook } from '../../lib/interfaces/book.interface';
import { first } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { BookDialogComponent } from '../../components/book-dialog/book-dialog.component';

@Component({
  selector: 'app-book',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
})
export class BookComponent implements OnInit {
  
  constructor(
    private readonly bookService: BookService,
    private dialog: MatDialog,
    private router: Router
  ){}

  @Input() id!: string;
  bookData: IBook;

  ngOnInit(): void {
    this.bookService.getSingleBook(parseInt(this.id)).pipe(first()).subscribe({
      next: (book: IBook) => {
        this.bookData = book;
      }
    })
  }

  openDeleteDialog() {
    this.dialog.open(ConfirmationDialogComponent, { data: this.bookData }).afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.bookService.deleteBook(<number>this.bookData.id).subscribe({
            next: () => {
              this.router.navigate(['/'])
            }
          })
        }
      }
    })
  }

  openEditDialog() {
    this.dialog.open(BookDialogComponent, { data: this.bookData, width: '500px'}).afterClosed().subscribe({
      next: (result: IBook) => {
        if (result) {
          this.bookData = result;
        }
      }
    })
  }
}
