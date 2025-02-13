import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { IBook } from '../../lib/interfaces/book.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../lib/services/book.service';
import { RouterLink } from '@angular/router';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { BookDialogComponent } from '../../components/book-dialog/book-dialog.component';
import { AdvSearchDialogComponent } from '../../components/adv-search-dialog/adv-search-dialog.component';
import { IBookSearchOptions } from '../../lib/interfaces/bookSearchOptions.interface';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule, 
    MatTableModule, 
    MatIconModule, 
    MatSortModule, 
    MatInputModule, 
    MatFormFieldModule, 
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDialogModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  bookData: IBook[] = [];
  bookTableColumns: string[] = ['bookName', 'author', 'pageCount', 'actions'];
  dataSource: MatTableDataSource<IBook>;
  searchForm = new FormGroup({
    searchField: new FormControl('')
  });

  showResetButton = false;
  showName = false;

  constructor(
    private readonly bookService: BookService,
    private dialog: MatDialog
  ) { 
    this.searchForm.controls['searchField'].valueChanges.subscribe({
      next: () => {
        this.applyFilter()
      }
    })
  }

  ngAfterViewInit(): void {
    this.resetDataSource(true)
  }

  resetDataSource(init: boolean = false) {
    this.bookService.getBooks().subscribe({
      next: (books: IBook[]) => {
        this.bookData = books;
        this.dataSource = new MatTableDataSource(this.bookData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        if (!init)
          this.dataSource._updateChangeSubscription();
      }
    })
  }

  openDeleteDialog(book: IBook) {
    this.dialog.open(ConfirmationDialogComponent, { data: book }).afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.bookService.deleteBook(<number>book.id).subscribe({
            next: () => {
              this.dataSource.data.splice(this.dataSource.data.findIndex(elem => elem.id === book.id), 1);
              this.dataSource._updateChangeSubscription();
            }
          })
        }
      }
    })
  }

  openEditDialog(book?: IBook) {
    this.dialog.open(BookDialogComponent, { data: book, width: '500px'}).afterClosed().subscribe({
      next: (result: IBook) => {
        if (result) {
          if (result.id) { //existing book
            this.bookService.updateBook(result).subscribe({
              next: (updatedBook: IBook) => {
                this.dataSource.data[this.dataSource.data.findIndex(elem => elem.id === updatedBook.id)] = updatedBook;
                this.dataSource._updateChangeSubscription();
              }
            })
          } else { //create new book
            this.bookService.createBook(result).subscribe({
              next: (newBook: IBook) => {
                this.dataSource.data.push(newBook);
                this.dataSource._updateChangeSubscription();
              }
            })
          }
        }
      }
    })
  }

  openAdvSearchDialog() {
    this.dialog.open(AdvSearchDialogComponent, { width: '500px' }).afterClosed().subscribe({
      next: (result: IBookSearchOptions) => {
        if (result) {
          this.bookService.advancedSearch(result).subscribe({
            next: (books: IBook[]) => {
              this.bookData = books;
              this.dataSource = new MatTableDataSource(this.bookData);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
              this.showResetButton = true;
              this.dataSource._updateChangeSubscription();
            }
          })
        }
      }
    })
  }

  applyFilter() {
    const filterValue = this.searchForm.controls.searchField.value || '';
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


