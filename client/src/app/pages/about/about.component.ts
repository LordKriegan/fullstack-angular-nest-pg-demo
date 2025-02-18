import { Component } from '@angular/core';
import { CoreModule } from '../../lib/modules/core.module';
import { ListComponent } from '../../components/list/list.component';

@Component({
  selector: 'app-about',
  imports: [ CoreModule, ListComponent ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  techList = ["Angular v19.1.0", "NestJS v11.0.1", "Node v20.11.0", "Postgres v16"]

}
