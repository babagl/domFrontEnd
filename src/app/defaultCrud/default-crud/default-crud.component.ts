import { Component, OnInit } from '@angular/core';
import { tableComponent } from "../../../../lib/tables/tables.components";
import { DefaultCrudService } from '../services/default-crud.service';

@Component({
  selector: 'app-default-crud',
  standalone: true,
  imports: [tableComponent],
  templateUrl: './default-crud.component.html',
  styleUrl: './default-crud.component.scss'
})
export class DefaultCrudComponent implements OnInit{

  constructor(private crudService : DefaultCrudService ){}

  dataTable : any[] = [];
  withDelete : boolean = false;
  withUpdate : boolean = false;


  ngOnInit(): void {
    this.crudService.getData("","model.schema.json").subscribe({
      next : (data)=>{
        console.log(data);
        

      },error : () =>{
        console.error("Erreur lors de la lecture du fichier json" );
        
        
      },
      complete : () => {
        
      }
    })
      //this.getData()
  }




  getData(){
   this.crudService.getData("posts").subscribe()

  }

  updateData(dataId : number){
    console.log("updata data")
    console.log(dataId);
    
  }
  deleteData(dataId : number){
    console.log("delete data");
    console.log(dataId);
    
  }

}
