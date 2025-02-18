import { Component } from '@angular/core';
import { CoreModule } from './lib/modules/core.module';

@Component({
  selector: 'app-root',
  imports: [ CoreModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
