import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Recipe } from "./recipe.model";
import { Actions, ofType } from '@ngrx/effects';

import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';
import { map, switchMap, take } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{
    constructor(
        private store: Store<fromApp.AppState>,
        private action$: Actions
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const recipes =  this.recipeService.getRecipes();
        // if(recipes.length <= 0){
        //     return this.dataStroageService.fetchRecipes();
        // }
        // return recipes;
        return this.store.select('recipes')
            .pipe(
                take(1),
                map(recipesState => {
                    return recipesState.recipes;
                }),
                switchMap(recipes => {
                    if (recipes.length === 0) {
                        this.store.dispatch(new RecipesActions.FetchRecipes());
                        return this.action$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
                    }
                    else {
                        return of(recipes);
                    }
                })
            );
    }
}