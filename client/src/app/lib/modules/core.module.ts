import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@NgModule({
    imports: [
        MaterialModule,
        RouterLink,
        RouterOutlet
    ],
    exports: [
        MaterialModule,
        ReactiveFormsModule,
        RouterLink,
        RouterOutlet
    ]
})
export class CoreModule { }