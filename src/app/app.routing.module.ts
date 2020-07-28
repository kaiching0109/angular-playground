import { Route } from "@angular/compiler/src/core";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesResovlerService } from "./recipes/recipes-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { FormsModule } from "@angular/forms";

const appRoutes: Routes = [
    { path: '', redirectTo: 'recipe', pathMatch: 'full' },
    { path: 'recipe', component: RecipesComponent, children: [
        {path: '',  component: RecipeStartComponent, pathMatch: 'full', resolve: [RecipesResovlerService] },
        {path: 'new', component: RecipeEditComponent },
        {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResovlerService] },
        {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResovlerService] },
    ] },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'auth' , component: AuthComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
        FormsModule
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}