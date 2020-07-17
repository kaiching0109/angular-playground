import { RecipeService } from '../../../services/recipe.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Recipe } from '../recipe.model';
import { Observable } from 'rxjs';

@Injectable()
export class RecipeDetailResolver implements Resolve<Recipe> {
    constructor(private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
        return this.recipeService.getRecipe(+route.params['id'])
    }
}