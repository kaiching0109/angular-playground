import { Recipe } from "../app/recipes/recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
    recipeSelected = new Subject<Recipe>();
    recipeChanged = new Subject<Recipe[]>();

    constructor(private slService: ShoppingListService) { }
    private recipes: Recipe[] = [];

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next([...this.recipes])
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    getRecipes() {
        return [...this.recipes];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.onIngredientsAdded(ingredients)
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next([...this.recipes])
    }

    removeRecipe(index: number) {
        this.recipes = this.recipes.filter((recipe, i) => i !== index)
        this.recipeChanged.next([...this.recipes])
    }
    
    updateRecipe(index: number, recipeToUpdate: Recipe) {
        this.recipes[index] = recipeToUpdate;
        this.recipeChanged.next([...this.recipes])
    }

}