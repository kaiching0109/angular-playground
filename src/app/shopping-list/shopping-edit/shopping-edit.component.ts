import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit{
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  @ViewChild('f') slForm: NgForm;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startEditting.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      const ingredientToEdit = this.slService.getIngredient(this.editedItemIndex);
      if(ingredientToEdit) {
        const { name, amount } = ingredientToEdit;
        this.slForm.setValue({ name, amount })
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmitItem() {
    if(this.slForm) {
      const { value: { name, amount } } = this.slForm;
      const newIngredient = new Ingredient(name, amount);
      if(this.editMode) {
        this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      }
      else this.slService.onIngredientAdded(newIngredient);
    }
    this.editMode = false;
    this.slForm.reset();
  }

  onRemoveItem() {
    if(this.slForm && this.editedItemIndex > -1) {
      this.slService.removeIngredient(this.editedItemIndex);
      this.slForm.reset();
    }
  }

  onRemoveAllItems(){
    this.slForm.reset();
    this.slService.onIngredientReset();
  }

  onResetItem() {
    this.slForm.reset();
  }

}
