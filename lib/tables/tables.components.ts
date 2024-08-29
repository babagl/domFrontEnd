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
    @Output() dataToUpdate : EventEmitter<string> = new EventEmitter<string>();
    @Output() dataToDelete : EventEmitter<string> = new EventEmitter<string>();


    public updateData=(dataId : string)=>{
        this.dataToUpdate.emit(dataId);
    }
    public deleteData=(dataId : string)=>{
        this.dataToDelete.emit(dataId)
    }

}
