import { Recipe } from "../app/recipes/recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Injectable()
export class RecipeService {
    /**
     *
     */
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

    recipeSelected = new EventEmitter<Recipe>();

    getRecipes() {
        return [...this.recipes];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.onIngredientsAdded(ingredients)
    }

}