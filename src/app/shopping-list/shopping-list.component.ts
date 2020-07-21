import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from 'src/services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub: Subscription;
  
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.igChangeSub = this.slService.ingredientsChanged.subscribe(
      (changedIngredients: Ingredient[]) => { 
        this.ingredients = changedIngredients; 
        }
      );
  }

  onEditItem(index: number) : void {
    this.slService.startEditting.next(index);
  }

  ngOnDestroy() : void {
      this.igChangeSub.unsubscribe();
  }

}
