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
    private  recipes: Recipe[] = [
        new Recipe('A Test Recipe', 
        'This is simply a test', 
        'https://s3-ap-northeast-1.amazonaws.com/snpd-tokyo-user-profile-icon/52f42d75fdf45f6bd6e3eb1c.jpg', 
        [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 1)
        ]),
        new Recipe('Another Test Recipe', 
        'This is simply a test', 
        'https://s3-ap-northeast-1.amazonaws.com/snpd-tokyo-user-profile-icon/52f42d75fdf45f6bd6e3eb1c.jpg', 
        [
            new Ingredient('Buns', 1),
            new Ingredient('Meat', 20)
        ]),
      ];

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