import { createReducer, on, ActionCreatorProps} from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import { addIngredient } from './shopping-list.actions';

const initialState = { 
                        payload:[ new Ingredient('Default ingredient', 1) ]
                     };

export const shoppingListReducer = createReducer(initialState,
    on(addIngredient,
      (state,action)=>{
        console.log('hello add Ing');
        console.log([...state.payload, ...action.payload]);
        return {
                 payload: [...state.payload, ...action.payload]
               };
      })
);