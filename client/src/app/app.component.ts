import { Component } from '@angular/core';
import { CoreModule } from './lib/modules/core.module';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [ CoreModule, HeaderComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
