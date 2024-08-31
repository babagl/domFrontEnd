import { Routes } from '@angular/router';
import { DefaultCrudComponent } from './defaultCrud/default-crud/default-crud.component';
import {preloadModelSchemaJsonResolver} from "./helper/resolvers/preload-model-schema-json.resolver";

export const routes: Routes = [
    {
        path : 'posts',
        component : DefaultCrudComponent,
      resolve : {
          data : preloadModelSchemaJsonResolver
      }

},
{
    path : 'users',
    component : DefaultCrudComponent,
    resolve : {
      data : preloadModelSchemaJsonResolver
    }

},
{

    path : "medicament",
    component : DefaultCrudComponent,
    resolve : {
        data : preloadModelSchemaJsonResolver
    }
},
{
    path : '**',
    redirectTo : 'posts'
}
];
