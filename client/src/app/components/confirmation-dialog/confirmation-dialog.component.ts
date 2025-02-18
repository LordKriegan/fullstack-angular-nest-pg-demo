import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IBook } from '../../lib/interfaces/book.interface';
import { CoreModule } from '../../lib/modules/core.module';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [ CoreModule ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public book: IBook
  ) {}

}
