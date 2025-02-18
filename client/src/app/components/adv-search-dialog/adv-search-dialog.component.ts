import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IBookSearchOptions } from '../../lib/interfaces/bookSearchOptions.interface';
import { CoreModule } from '../../lib/modules/core.module';

@Component({
  selector: 'app-adv-search-dialog',
  imports: [CoreModule],
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
