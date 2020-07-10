import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://s3-ap-northeast-1.amazonaws.com/snpd-tokyo-user-profile-icon/52f42d75fdf45f6bd6e3eb1c.jpg'),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://s3-ap-northeast-1.amazonaws.com/snpd-tokyo-user-profile-icon/52f42d75fdf45f6bd6e3eb1c.jpg'),
  ];

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipeEl: Recipe){
    this.recipeWasSelected.emit(recipeEl)
  }

}
