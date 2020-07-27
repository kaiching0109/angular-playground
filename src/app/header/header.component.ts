import { Component, EventEmitter, Output, Injectable } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {
    collapsed = true;
    @Output() featureSelected = new EventEmitter<string>();

    constructor(private dataStorageService: DataStorageService){

    }
    
    ngOnInit(): void {
        this.dataStorageService.getRecipes();
    }


    onSelect(feature: string) {
        this.featureSelected.emit(feature);
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.getRecipes();
    }
}