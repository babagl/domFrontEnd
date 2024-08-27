import {AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
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
  @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>(); // Émet un événement lorsqu'on ferme le modal
  @Output() dataToAdd : EventEmitter<any> = new EventEmitter<any>();
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
    this.dataToAdd.emit(this.form.value);
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
      for (let i = 0; i < dataElement["value"].length; i++) {
        valueFormGroup[dataElement["value"][i]["name"]] = [
              dataElement["value"][i]["control"]["initiale"],
              this.getValidationsOfField(dataElement["value"][i]["control"]["validations"])
        ];
      }
    }
    return valueFormGroup;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataForModalAjout'] && this.dataForModalAjout.length > 0) {
      this.form = this.formBuilder.group({
        ...this.getValueAndControlInData(this.dataForModalAjout)
      });
    }
    if(changes["modalVisible"] && !this.isVisible){
      this.close();
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
    for (let i = 0; i < validations.length; i++) {
      if(validations[i].startsWith("required")){
        trueValidations.push(Validators.required)
      }
      if(validations[i].startsWith("min_")){
        trueValidations.push(Validators.min(parseInt(validations[i].split("_")[1])))
      }
      if(validations[i].startsWith("max_")){
        trueValidations.push(Validators.max(parseInt(validations[i].split("_")[1])))
      }
      if(validations[i].startsWith("email")){
        trueValidations.push(Validators.email)
      }
      if(validations[i].startsWith("minLength")){
        trueValidations.push(Validators.minLength(parseInt(validations[i].split("_")[1])))
      }
      if(validations[i].startsWith("maxLength")){
        trueValidations.push(Validators.maxLength(parseInt(validations[i].split("_")[1])))
      }
      if(validations[i].startsWith("pattern")){
        trueValidations.push(Validators.pattern(validations[i].split("_")[1]))
      }
    }
    return trueValidations;
  }

}
