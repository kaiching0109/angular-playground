import { Ingredient } from "../app/shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient("Apples", 5),
        new Ingredient("Tomatoes", 10)
    ];
    ingredientsChanged =  new Subject<Ingredient[]>();
    startEditting = new Subject<number>();   
    
    getIngredients() {
        return [...this.ingredients];
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    onIngredientAdded(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next([...this.ingredients]);
    }

    onIngredientsAdded(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next([...this.ingredients]);
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next([...this.ingredients]);
    }

    onIngredientReset() {
        this.ingredients = [];
        this.ingredientsChanged.next([])
    }

    removeIngredient(index: number) {
        this.ingredients = this.ingredients.filter((ingredient, i) => i !== index);
        this.ingredientsChanged.next([...this.ingredients])
    }
}