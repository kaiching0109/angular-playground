import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "src/services/recipe.service";

@Injectable({providedIn: 'root'})
export class RecipesResovlerService implements Resolve<Recipe[]>{
    constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipeService.getRecipes();
        if(recipes.length === 0) {
            return this.dataStorageService.getRecipes();
        } else {
            return recipes;
        }
    }
}