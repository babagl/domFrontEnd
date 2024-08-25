import { Routes } from '@angular/router';
import { DefaultCrudComponent } from './defaultCrud/default-crud/default-crud.component';

export const routes: Routes = [
    {
        path : 'posts',
        component : DefaultCrudComponent

},
{
    path : 'users',
    component : DefaultCrudComponent

},
{
    path : '**',
    redirectTo : 'posts'
}
];
