import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {


    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 
        'This is simply a test', 
        'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
        [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
        ]),
        new Recipe('Another Recipe', 
        'This is simply a test', 
        'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
        [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20),
        ])
    ];

    constructor(private slService: ShoppingListService){

    }

    getRecipes(){
        return this.recipes.slice(); // To not give the reference
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        // ingredients.map(ingredient => {
        //     this.slService.addIngredient(ingredient);
        // })
        this.slService.addIngredients(ingredients);
    }
    
    getRecipe(index: number){
        return this.recipes[index];
    }

}