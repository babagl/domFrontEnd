import { Injectable } from '@angular/core';
import {Observable, tap} from 'rxjs';
import {DefaultService} from "../../helper/services/default.service";


@Injectable({
  providedIn: 'root'
})
export class DefaultCrudService extends DefaultService{

  private jsonUrl = 'model.schema.json';


/*
* Méthode pour récuperer les données présentes dans le fichier mo*/
  getDataInJasonFile() : Observable<any> {
    return this.getHttp().get<any>(this.jsonUrl).pipe(
      tap(value => console.log(value))
    );
  }
}
