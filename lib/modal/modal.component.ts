import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import {NgClass} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";


@Component({
  selector: 'lib-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  standalone: true,

  imports: [
    NgClass,
    ReactiveFormsModule
  ]
})
export class ModalComponent implements  OnChanges{


  @Input() isVisible: boolean = false; // Contrôle la visibilité du modal
  @Input() dataForModalAjout: any[] = [];
  @Input() dataToUpdate: any;
  @Output() updateData:EventEmitter<any> = new EventEmitter<any>();
  @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>(); // Émet un événement lorsqu'on ferme le modal
  @Output() dataToAdd : EventEmitter<any> = new EventEmitter<any>();
  addOrUpdate : boolean = true;
  form !: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
        ...this.getValueAndControlInData(this.dataForModalAjout)
    })
  }


  /**
   * Méthode pour fermer le modal.
   */
  close() {
    this.isVisible = false;
    this.addOrUpdate = true;
    this.form.reset()
    this.isVisibleChange.emit(this.isVisible);
  }

  /**
   * Méthode pour fermer le modal lorsqu'on clique en dehors du contenu.
   * @return void
   */
  onOutsideClick(event: Event) {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.close();
    }
  }

  /**
  * Méthode pour soumettre le formulaire apres que tous les champs aient été validés.
  * Il envoie l'objet au composant parent
  * @return void */
  onSubmit(){
    if(this.addOrUpdate){
      this.dataToAdd.emit(this.form.value);
    }else {
      this.updateData.emit(this.form.value);
    }
    this.close();

  }

  /**
   * Cette méthode permet d'extraire les formcontrolname et les validations du modal à travers les données passées en input.
   * La variable contenant les données est un tableau d'objet, dont chaque objet contient
   * @param data : {"id" : string, value : any[] }[]
   * @return any
   * */
  private getValueAndControlInData(data : {"id" : string, value : any[] }[]){
    let valueFormGroup : any = {};
    for (const dataElement of data) {
      for (const dataElementElement of dataElement["value"]) {
        valueFormGroup[dataElementElement["name"]] = [
          dataElementElement["control"]["initiale"],
          this.getValidationsOfField(dataElementElement["control"]["validations"])
        ];
      }
    }
    return valueFormGroup;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataForModalAjout'] && this.dataForModalAjout.length > 0) {
      this.addOrUpdate = true;
      this.form = this.formBuilder.group({
        ...this.getValueAndControlInData(this.dataForModalAjout)
      });
    }
    if(changes["modalVisible"] && !this.isVisible){
      this.close();
    }
    if (this.dataToUpdate) {
      this.addOrUpdate = false;
      let val: any = {};
      if (this.dataToUpdate["id"]) {
        for (const [key, value] of Object.entries(this.dataToUpdate)) {
          if (key !== "id") {
            val[key] = value;
          }
        }
      } else {
        val = this.dataToUpdate;
      }
      this.form.patchValue(val);


    }
  }

/**
 * Méthode pour obtenir les validations assignée à un champ le le fichier model
 * Il prend en parametre un tableau de string, chaque élément étant une validation. Si une valeur est nessaire pour la validation, alors ellet est concaténée à la chaine de caractere avec un séparateur _
 * @param validations
 * @return Validators[]
 * */
  private getValidationsOfField(validations : string[]) : Validators[]{
    let trueValidations : Validators[] =[];
    for (const validation of validations) {
        if(validation.startsWith("required")){
          trueValidations.push(Validators.required)
        }
        if(validation.startsWith("min_")){
          trueValidations.push(Validators.min(parseInt(validation.split("_")[1])))
        }
        if(validation.startsWith("max_")){
          trueValidations.push(Validators.max(parseInt(validation.split("_")[1])))
        }
        if(validation.startsWith("email")){
          trueValidations.push(Validators.email)
        }
        if(validation.startsWith("minLength")){
          trueValidations.push(Validators.minLength(parseInt(validation.split("_")[1])))
        }
        if(validation.startsWith("maxLength")){
          trueValidations.push(Validators.maxLength(parseInt(validation.split("_")[1])))
        }
        if(validation.startsWith("pattern")){
          trueValidations.push(Validators.pattern(validation.split("_")[1]))
        }
      }
      return trueValidations;
  }

}
