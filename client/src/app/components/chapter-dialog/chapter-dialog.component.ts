import { Component, Inject } from '@angular/core';
import { IChapter } from '../../lib/interfaces/chapter.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoreModule } from '../../lib/modules/core.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface IChapterWithIndex extends IChapter {
  index?: number;
}

@Component({
  selector: 'app-chapter-dialog',
  imports: [CoreModule],
  templateUrl: './chapter-dialog.component.html',
  styleUrl: './chapter-dialog.component.scss'
})
export class ChapterDialogComponent {

  chapter?: IChapterWithIndex | undefined;
  chapterForm: FormGroup;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public chapterData: IChapterWithIndex,
    private dialogRef: MatDialogRef<ChapterDialogComponent>
  ) {
    this.chapterForm = new FormGroup({
      chapterName: new FormControl(chapterData.chapterName, [Validators.required, Validators.max(50)]),
      pageCount: new FormControl(chapterData.pageCount, [Validators.min(1), Validators.required]),
      description: new FormControl(chapterData.description, [Validators.required, Validators.max(500)])
    })
  }

}
