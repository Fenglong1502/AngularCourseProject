import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

 const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Oranges', 10)
    ]
};

export function shoppingListReducer(
    state = initialState , 
    action: any 
) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT : 
            return {
                ...state,
                ingredients: [ ...state.ingredients, action.payload]
            }; 
        case ShoppingListActions.ADD_INGREDIENTS: 
            
        default: 
            return state;
    }

}