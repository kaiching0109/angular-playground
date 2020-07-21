import { Recipe } from "../app/recipes/recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
    recipeSelected = new Subject<Recipe>();

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

}