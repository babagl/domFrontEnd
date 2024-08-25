import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tableComponent } from "../../../../lib/tables/tables.components";
import { DefaultCrudService } from '../services/default-crud.service';
import {switchMap, tap} from "rxjs";

@Component({
  selector: 'app-default-crud',
  standalone: true,
  imports: [tableComponent],
  templateUrl: './default-crud.component.html',
  styleUrl: './default-crud.component.scss'
})
export class DefaultCrudComponent implements OnInit{

  constructor(private crudService : DefaultCrudService , private router : Router){}

  title : string = "";
  headerTable : string[] = [];
  dataTable : any[] = [];
  withDelete : boolean = false;
  withUpdate : boolean = false;
  uri : string = "";


  ngOnInit(): void {
      this.uri = this.router.url.substring(1);
      this.getData(this.uri);
  }



  /*
  * Méthode pour charger les données
  * */
  getData(uri : string){
    this.crudService.getData("","model.schema.json").pipe(
      tap((data : any)=>{
        console.log("-------------------")
        console.log(data)
        this.title = data["titre"];
        this.headerTable = data[uri]["headerTable"];
        this.withDelete = data[uri]["withDelete"];
        this.withDelete = data[uri]["withDelete"];
      }),
      switchMap((data : any) => {
        console.log(data)
        return this.crudService.getData(data[uri]["endpoint"])
      })
    ).subscribe({
      next : (data : any)=>{
        this.dataTable = data;
      },error : () =>{
        console.error("Erreur lors de la lecture du fichier json" );


      }
    })

  }

  updateData(dataId : number){
    console.log("updata data")
    console.log(dataId);

  }
  deleteData(dataId : number){
    this.crudService.deleteData(this.uri, dataId).subscribe(
      {
        next : (data : any)=>{
          this.dataTable = this.dataTable.filter((element : any ) => element.id !== dataId);
        }
      }
    )

  }

}
