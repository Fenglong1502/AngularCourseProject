import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('A Test Recipe', 
    //     'This is simply a test', 
    //     'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
    //     [
    //         new Ingredient('Buns', 2),
    //         new Ingredient('Meat', 1)
    //     ]),
    //     new Recipe('Another Recipe', 
    //     'This is simply a test', 
    //     'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
    //     [
    //         new Ingredient('Meat', 1),
    //         new Ingredient('French Fries', 20),
    //     ])
    // ];

    private recipes: Recipe[] = [];

    constructor(
        private store: Store<fromShoppingList.AppState>
    ) {
        
    }

    getRecipes() {
        return this.recipes.slice(); // To not give the reference
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        // ingredients.map(ingredient => {
        //     this.slService.addIngredient(ingredient);
        // })
        // this.slService.addIngredients(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe)
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

}