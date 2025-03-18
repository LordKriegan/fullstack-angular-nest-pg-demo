import { Component, Inject } from '@angular/core';
import { IChapter } from '../../lib/interfaces/chapter.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoreModule } from '../../lib/modules/core.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-chapter-dialog',
  imports: [CoreModule],
  templateUrl: './chapter-dialog.component.html',
  styleUrl: './chapter-dialog.component.scss'
})
export class ChapterDialogComponent {

  chapter?: IChapter | undefined;
  chapterForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public chapterData: IChapter,
    private dialogRef: MatDialogRef<ChapterDialogComponent>
  ) {
    this.chapter = chapterData;
    this.chapterForm = new FormGroup({
      chapterName: new FormControl(this.chapter?.chapterName || '', [Validators.required, Validators.max(50)]),
      pageCount: new FormControl(this.chapter?.pageCount || 1, [Validators.min(1), Validators.required]),
      description: new FormControl(this.chapter?.description || '', [Validators.required, Validators.max(500)])
    })
  }

  handleSubmit() {
    this.dialogRef.close(<IChapter>{
        id: this.chapter?.id,
        ...this.chapterForm.value
      })
  }

}
