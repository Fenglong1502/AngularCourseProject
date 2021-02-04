import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from 'rxjs/operators';
import { RecipesComponent } from "../recipes/recipes.component";

@Injectable({
    providedIn: 'root'
})
export class DataStroageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        return this.http.put('https://ng-course-recipe-book-9cb37-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes(){
        return this.http
        .get<Recipe[]>('https://ng-course-recipe-book-9cb37-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map(recipe => {
            return recipe.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ?? []};
            });
        }),
        tap(recipes => {
            this.recipeService.setRecipes(recipes);
        })
        )
    }
}