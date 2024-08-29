import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from "../../../../lib";
import { DefaultCrudService } from '../services/default-crud.service';
import {switchMap, tap} from "rxjs";
import {ModalComponent} from "../../../../lib/modal/modal.component";
import {AlertService} from "../../helper/services/alert.service";

@Component({
  selector: 'app-default-crud',
  standalone: true,
  imports: [TableComponent, ModalComponent],
  templateUrl: './default-crud.component.html',
  styleUrl: './default-crud.component.scss'
})
export class DefaultCrudComponent implements OnInit{


  title : string = "";
  headerTable : string[] = [];
  dataTable : any[] = [];
  withDelete : boolean = false;
  withUpdate : boolean = false;
  dataToUpdate : any;
  uri : string = "";
  modalVisible: boolean = false; // État de visibilité du modal
  dataForModalAjout : any[] = [];

  constructor(private crudService : DefaultCrudService , private router : Router, private  alertService : AlertService){}


  ngOnInit(): void {
      this.uri = this.router.url.substring(1);
      this.getData(this.uri);
  }

  /*
  * Méthode pour charger les données
  * */
  getData(uri : string){
    this.crudService.getDataInJasonFile().pipe(
      tap((data : any)=>{
        console.log("-------------------")
        console.log(data)
        this.title = data["titre"];
        this.headerTable = data[uri]["headerTable"];
        this.withUpdate = data[uri]["withUpdate"];
        this.withDelete = data[uri]["withDelete"];
        this.dataForModalAjout = data[uri]["ajout"];
      }),
      switchMap((data : any) => {
        console.log(data)
        return this.crudService.getData(data[uri]["endpoint"])
      })
    ).subscribe({
      next : (data : any)=>{
        this.dataTable = data;
      },error : () =>{
        this.alertService.showAlert({
          title: "Erreur",
          text: "Une érreur s'est produite lors de la récupération des données ",
          icon: "error"
        });
        console.error("Erreur lors de la lecture du fichier json" );


      }
    })

  }

  dataIdDateToUpdate(dataId : string){
    this.dataToUpdate = this.dataTable.find(element => element["id"] == dataId);
    this.modalVisible = true;
  }



  updateData(data : any){
    console.log("mons")
    console.log(this.dataToUpdate)
    this.crudService.putData(this.uri+"/"+this.dataToUpdate.id.toString(), data).subscribe({
      next :(value : any) =>{
        console.log(value)
        this.dataTable = this.dataTable.filter(element => element.id != this.dataToUpdate.id)
        this.dataTable.unshift(value)
      },
      error : (err)=>{
        console.log(err)
        this.alertService.showAlert({
          title: "Erreur",
          text: "Une érreur s'est produite lors de la modification des données",
          icon: "error"
        })
      }
    })
  }
  deleteData(dataId : string){
    this.crudService.deleteData(this.uri, dataId).subscribe(
      {
        next : (data : any)=>{
          this.dataTable = this.dataTable.filter((element : any ) => element.id !== dataId);
        }
      }
    )

  }

  addNewData(data : any){
    this.crudService.postData<any,any>(this.uri, data).subscribe({
      next : (value : any)=> {
        this.dataTable.unshift(data);
        this.modalVisible = false;
        this.alertService.showAlert({
          title: "Ajout",
          text: "Opération effectuée avec succes",
          icon: "success"
        });
    }
    })
  }



  // Méthode pour ouvrir le modal
  openModal() {
    this.modalVisible = true;
  }

}
