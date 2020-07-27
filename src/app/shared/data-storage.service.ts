import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { RecipeService } from 'src/services/recipe.service';


@Injectable({ providedIn: 'root'  })
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {

    }

    getRecipes() {
        this.http.get('https://ng-complete-guide-94c21.firebaseio.com/recipes.json').subscribe(response => {
            this.recipeService.setRecipes(response)
        })
    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-complete-guide-94c21.firebaseio.com/recipes.json', recipes).subscribe(console.log)
    }
}