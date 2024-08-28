import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {environment} from "../../../environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class DefaultService {

  private  url = environment.api.url

  constructor(private  http: HttpClient) { }

  /*
  * getter de la propriété private http
  * @return HttpClient
  * */
   getHttp() : HttpClient{
    return this.http;
  }

  /**
  * Méthode pour obtenir les données à partir d'un uri
  * @param uri
   * @return Observable<T>
  * */
   getData<T>(uri: string): Observable<T> {
    return this.http.get<T>(this.url + uri).pipe(
      tap(value => {
        console.log(value);
      })
    );
  }

  /**
   * Méthode pour envoyer des données via une requete post
   * Il prend deux types génériques : E pour le type des données qui seront envoyées et R pour le type des données qui seront recue apres le traitement de la requete
   * @param uri : string
   * @param data
   * @return Observable<R>
   * */
   postData<E, R>(uri: string, data: E): Observable<R> {
    return this.http.post<R>(this.url + uri, data).pipe(
      tap(value => console.log(value)
      )
    );
  }


  /**
   * Méthode pour envoyer des données via une requête put
   * Il prend deux types génériques : E pour le type des données qui seront envoyées et R le type des données qui seront reçues
   * @param uri : string
   * @param data : E
   * @return Observable<E>
  * */
   putData<E, R>(uri: string, data: E): Observable<R> {
    return this.http.put<R>(this.url + uri, data).pipe(
      tap(value => console.log(value)
      )
    );
  }

  /**
   * Méthode pour envoyer une requete delete
   * Il prend deux types génériques : E pour le type de l'id et R le type des données reçues
   * @param uri : string
   * @param id : E
   * @return Observable<R>
   *   */
   deleteData<E, R>(uri: string, id: E): Observable<R> {
    return this.http.delete<R>(this.url + uri + `/${id}`).pipe(
      tap(value => console.log(value))
    );
  }

  /**
   * Méthode pour envoyer une requete patch
   * Il prend deux types génériques : E pour le type de l'id et R le type des données reçues
   * @param uri : string
   * @param id : number
   * @param data : E
   * @return Observable<E>
  * */
  partialUpadate<E,R>(uri: string, id: string | number, data : E): Observable<R> {
    return this.http.patch<R>(this.url + uri + `/${id}`, data).pipe(
      tap((value : R) => {
        console.log(value)
      })
    );
  }
}
