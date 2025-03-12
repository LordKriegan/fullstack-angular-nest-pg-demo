import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterLink,
        RouterOutlet
    ],
    exports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterLink,
        RouterOutlet
    ]
})
export class CoreModule { }