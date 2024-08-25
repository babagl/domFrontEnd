import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, tap} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DefaultCrudService  {
  private static url = "http://localhost:3000/"
  private jsonUrl = 'assets/data.json';

  constructor(private  http : HttpClient){

  }

  getData(uri:string, urlTo:string=DefaultCrudService.url) : Observable<any>{
    return this.http.get(`${urlTo+uri}`).pipe(
      tap( (data) => {
        console.log(data);
      }
       )
    )
  }

  deleteData(uri:string, dataId : number) : Observable<any>{
    return this.http.delete(`${DefaultCrudService.url+uri}/${dataId}`).pipe(
      tap((data)=>{
        console.log(data);
      })
    )
  }



}
