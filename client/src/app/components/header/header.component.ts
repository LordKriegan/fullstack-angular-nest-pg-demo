import { Component } from '@angular/core';
import { CoreModule } from '../../lib/modules/core.module';

@Component({
  selector: 'app-header',
  imports: [ CoreModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
