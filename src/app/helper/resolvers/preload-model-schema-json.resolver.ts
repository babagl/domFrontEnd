import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import {DefaultCrudService} from "../../defaultCrud/services/default-crud.service";
import {catchError, map, of, switchMap, tap} from "rxjs";

export const preloadModelSchemaJsonResolver: ResolveFn<any> = (route, state) => {
  const crudService = inject(DefaultCrudService);
  const uri = state.url.substring(1);
  let data : any = {}
  return crudService.getDataInJasonFile().pipe(
    tap((val : any)=>{
      data["titre"] = val[uri]["titre"];
      data["headerTable"] = val[uri]["headerTable"];
      data["withUpdate"] = val[uri]["withUpdate"];
      data["withDelete"] = val[uri]["withDelete"];
      data["dataForModalAjout"] = val[uri]["ajout"];
    }),
    switchMap((val : any) => {
      console.log(data)
      return crudService.getData(val[uri]["endpoint"])
    }),map((value : any) => {
      data["data"] = value
      console.log("tetetetet")
      console.log(data)
      return data;
    })
  );
};
