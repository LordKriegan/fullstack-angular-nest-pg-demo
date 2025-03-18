import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { IBook } from '../../lib/interfaces/book.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';
import { BookService } from '../../lib/services/book.service';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { BookDialogComponent } from '../../components/book-dialog/book-dialog.component';
import { AdvSearchDialogComponent } from '../../components/adv-search-dialog/adv-search-dialog.component';
import { IBookSearchOptions } from '../../lib/interfaces/bookSearchOptions.interface';
import { CoreModule } from '../../lib/modules/core.module';

@Component({
  selector: 'app-home',
  imports: [ CoreModule ],
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
    this.bookService.getBooks().subscribe({
      next: (books: IBook[]) => {
        this.bookData = books;
        this.resetDataSource(true);
      }
    })
  }

  resetDataSource(init: boolean = false) {
        this.dataSource = new MatTableDataSource(this.bookData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data: IBook, filter: string) => {
          
          const filtersFound: boolean[] = [];
          const filterLower = filter.toLowerCase();
          filtersFound.push(data.bookName?.toLowerCase().includes(filterLower) || false);
          filtersFound.push(data.pageCount?.toString().toLowerCase().includes(filterLower) || false);
          filtersFound.push(data.description?.toLowerCase().includes(filterLower) || false);
          filtersFound.push(data.authors?.map(({ author }) => author).join(' ').toLowerCase().includes(filterLower) || false);
          filtersFound.push(data.chapters?.map(({ chapterName }) => chapterName).join(' ').toLowerCase().includes(filterLower) || false);
          return filtersFound.length ? filtersFound.reduce((a: boolean, b: boolean) => Boolean(a || b)) : true;
        }
        if (!init) this.dataSource._updateChangeSubscription();
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
      next: (result: { bookUpdated: boolean, newBook: IBook }) => {
        if (result.bookUpdated) {
          if (result.newBook.id) { //existing book
            this.bookService.updateBook(result.newBook).subscribe({
              next: (updatedBook: IBook) => {
                this.dataSource.data[this.dataSource.data.findIndex(elem => elem.id === updatedBook.id)] = result.newBook;
                this.dataSource._updateChangeSubscription();
              }
            })
          } else { //create new book
            this.bookService.createBook(result.newBook).subscribe({
              next: (newBook: IBook) => {
                this.dataSource.data.push(newBook);
                this.dataSource._updateChangeSubscription();
              }
            })
          }
        } else {
          //todo: handle authors change
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
              this.resetDataSource(false)
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


