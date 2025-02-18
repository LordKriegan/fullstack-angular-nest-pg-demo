import { Component } from '@angular/core';
import { CoreModule } from '../../lib/modules/core.module';
import { COMPONENTS } from '../../lib/other/components';

@Component({
  selector: 'app-about',
  imports: [ CoreModule, ...COMPONENTS ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  techList = ["Angular v19.1.0", "NestJS v11.0.1", "Node v20.11.0", "Postgres v16"]

}
