import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TConstructorIngredient } from '@utils-types';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },

    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },

    moveIngredient: (
      state,
      action: PayloadAction<{ index: number; direction: 'up' | 'down' }>
    ) => {
      const { index, direction } = action.payload;
      const newIndex = direction === 'up' ? index - 1 : index + 1;

      if (newIndex < 0 || newIndex >= state.ingredients.length) return;

      const [movedIngredient] = state.ingredients.splice(index, 1);
      state.ingredients.splice(newIndex, 0, movedIngredient);
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveIngredient
} = burgerConstructorSlice.actions;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
