import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DefaultCrudService  {
  private static url = "http://localhost:3000/"
  private jsonUrl = 'assets/data.json';

  constructor(private  http : HttpClient){

  }

  getData(uri:string, urlTo:string=DefaultCrudService.url){
    return this.http.get(`${urlTo+uri}`).pipe(
      tap( (data) => {
        console.log(data);
      }
       )
    )
  }
 
  
  
}
