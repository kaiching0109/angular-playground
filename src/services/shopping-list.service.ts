import { Ingredient } from "../app/shared/ingredient.model";
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient("Apples", 5),
        new Ingredient("Tomatoes", 10)
    ];
    ingredientsChanged =  new EventEmitter<Ingredient[]>();
    
    getIngredients() {
        return [...this.ingredients]
    }

    onIngredientAdded(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit([...this.ingredients]);
    }

    onIngredientsAdded(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit([...this.ingredients]);
    }

}