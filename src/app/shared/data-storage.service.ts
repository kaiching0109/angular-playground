import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from 'src/services/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root'  })
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {

    }

    getRecipes() {
        console.log('123123123')
        return this.authService.user.pipe(
        take(1), 
        exhaustMap(user => {
            console.log({user})
            return this.http.get<Recipe[]>('https://ng-complete-guide-94c21.firebaseio.com/recipes.json', {
                params: new HttpParams().set('auth', user?.token)
            })
        }),
        map(recipes => {
            console.log('here')
            return recipes.map(recipe => ({...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}));
        }),
        tap(recipes => {
            console.log(recipes)
            this.recipeService.setRecipes(recipes)
        })
        )
    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-complete-guide-94c21.firebaseio.com/recipes.json', recipes).subscribe(console.log)
    }
}