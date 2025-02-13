import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IBookSearchOptions } from '../../lib/interfaces/bookSearchOptions.interface';

@Component({
  selector: 'app-adv-search-dialog',
  imports: [
    MatButtonModule, 
    MatDialogModule, 
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './adv-search-dialog.component.html',
  styleUrl: './adv-search-dialog.component.scss'
})
export class AdvSearchDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<AdvSearchDialogComponent>
  ){}

  searchForm = new FormGroup({
    bookName: new FormControl(),
    author: new FormControl(),
    description: new FormControl(),
    minPages: new FormControl(),
    maxPages: new FormControl()
  })

  submitBtn() {
    const searchTerms: IBookSearchOptions = {...this.searchForm.value};
    for (const key in searchTerms)
      if (!searchTerms[key])
        delete searchTerms[key] //strip out any search terms that user did not enter.
    this.dialogRef.close(Object.keys(searchTerms).length ? searchTerms : null);
  }

}
