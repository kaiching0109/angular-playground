import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/services/shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit{

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(form: NgForm) {
    if(form) {
      const { value: { name, amount } } = form;
      const newIngredient = new Ingredient(name, amount);
      this.slService.onIngredientAdded(newIngredient);
    }
  }

}
