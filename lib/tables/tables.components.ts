import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'lib-table',
    templateUrl:'./table.component.html',
    styleUrl: './table.component.scss',
    standalone: true,

})
export class TableComponent{

    @Input() dataTable : any[] = [];
    @Input() headerTable : string[] = [];
    @Input() withUpdate: boolean = false;
    @Input() withDelete: boolean = false;
    @Output() dataToUpdate : EventEmitter<number> = new EventEmitter<number>();
    @Output() dataToDelete : EventEmitter<number> = new EventEmitter<number>();


    public updateData=(dataId : number)=>{
        this.dataToUpdate.emit(dataId);
    }
    public deleteData=(dataId : number)=>{
        this.dataToDelete.emit(dataId)
    }

}
