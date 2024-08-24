import { Routes } from '@angular/router';
import { DefaultCrudComponent } from './defaultCrud/default-crud/default-crud.component';

export const routes: Routes = [
    {
        path : 'crud',
        component : DefaultCrudComponent

},
{
    path : '**',
    redirectTo : 'crud'
}
];
