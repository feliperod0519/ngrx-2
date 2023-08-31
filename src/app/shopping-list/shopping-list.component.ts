import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription,Observable } from 'rxjs';
import {tap} from 'rxjs/operators';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';

import { Store } from '@ngrx/store';
import { addIngredient } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;//Ingredient[];//old-code
  private subscription: Subscription;

  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<{shoppingList:{ingredients: Ingredient[]}}>
  ) {}

  ngOnInit() {
    
    //this.store.dispatch(addIngredient({payload:[]}));
    this.ingredients = this.store.select('shoppingList');
    this.ingredients.pipe(tap(x=>{console.log(':)' + x);return x;})).subscribe(x=>console.log('-->'+ x))
    //this.ingredients.subscribe(x=>console.log('->' + x.ingredients));
    //OLD-CODE
    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
    //OLD-CODE-EOF

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
