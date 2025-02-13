import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './pages/book/book.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "book/:id",
        component: BookComponent
    },
    {
        path: "about",
        component: AboutComponent
    }
];
