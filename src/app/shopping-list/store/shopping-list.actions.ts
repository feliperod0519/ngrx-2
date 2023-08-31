import { createAction, props} from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const addIngredient = createAction('[ShoppingList] addIngredient',
                                           props<{ payload: Ingredient[] }>());