import { Component } from '@angular/core';
import { DataStroageService } from '../shared/data-storage.service';

@Component ({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {
    constructor(private dataStroageService : DataStroageService){}
    onSaveData(){
        this.dataStroageService.storeRecipes();
    }

    onFetchData(){
        this.dataStroageService.fetchRecipes().subscribe();
    }
}