import { getIngredients, ingredientsReducer } from '../ingredients-slice';

describe('ingredientsReducer', () => {
  it('возвращает начальное состояние при неизвестном экшене', () => {
    expect(ingredientsReducer(undefined, { type: 'UNKNOWN' })).toEqual({
      ingredients: [],
      isLoading: false,
      error: null
    });
  });

  it('обрабатывает getIngredients.pending', () => {
    const state = {
      ingredients: [],
      isLoading: false,
      error: 'Ошибка'
    };

    expect(
      ingredientsReducer(state, getIngredients.pending('requestId'))
    ).toEqual({
      ingredients: [],
      isLoading: true,
      error: null
    });
  });

  it('обрабатывает getIngredients.fulfilled', () => {
    const ingredients = [
      {
        _id: '1',
        name: 'Булка',
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 150,
        price: 100,
        image: 'image',
        image_mobile: 'image-mobile',
        image_large: 'image-large'
      }
    ];

    const state = {
      ingredients: [],
      isLoading: true,
      error: null
    };

    expect(
      ingredientsReducer(
        state,
        getIngredients.fulfilled(ingredients, 'requestId', undefined)
      )
    ).toEqual({
      ingredients,
      isLoading: false,
      error: null
    });
  });

  it('обрабатывает getIngredients.rejected', () => {
    const state = {
      ingredients: [],
      isLoading: true,
      error: null
    };

    expect(
      ingredientsReducer(
        state,
        getIngredients.rejected(new Error('Ошибка загрузки'), 'requestId')
      )
    ).toEqual({
      ingredients: [],
      isLoading: false,
      error: 'Ошибка загрузки'
    });
  });
});
