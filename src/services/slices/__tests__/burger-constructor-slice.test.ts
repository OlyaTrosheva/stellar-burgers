import {
  addIngredient,
  burgerConstructorReducer,
  clearConstructor,
  moveIngredient,
  removeIngredient
} from '../burger-constructor-slice';
describe('burgerConstructorReducer', () => {
  const bun = {
    _id: 'bun-1',
    name: 'Краторная булка',
    type: 'bun' as const,
    proteins: 80,
    fat: 2,
    carbohydrates: 50,
    calories: 420,
    price: 1255,
    image: 'bun-image',
    image_mobile: 'bun-image-mobile',
    image_large: 'bun-image-large'
  };
  const filling = {
    _id: 'filling-1',
    name: 'Филе Люминесцентного тюменского быка',
    type: 'main' as const,
    proteins: 20,
    fat: 10,
    carbohydrates: 15,
    calories: 200,
    price: 500,
    image: 'filling-image',
    image_mobile: 'filling-image-mobile',
    image_large: 'filling-image-large'
  };
  it('возвращает начальное состояние при неизвестном экшене', () => {
    expect(burgerConstructorReducer(undefined, { type: 'UNKNOWN' })).toEqual({
      bun: null,
      ingredients: []
    });
  });
  it('добавляет булку', () => {
    expect(
      burgerConstructorReducer(
        undefined,
        addIngredient({ ...bun, id: 'constructor-bun-1' })
      )
    ).toEqual({ bun: { ...bun, id: 'constructor-bun-1' }, ingredients: [] });
  });
  it('добавляет начинку', () => {
    expect(
      burgerConstructorReducer(
        undefined,
        addIngredient({ ...filling, id: 'constructor-filling-1' })
      )
    ).toEqual({
      bun: null,
      ingredients: [{ ...filling, id: 'constructor-filling-1' }]
    });
  });
  it('удаляет ингредиент', () => {
    const state = {
      bun: null,
      ingredients: [{ ...filling, id: 'constructor-filling-1' }]
    };
    expect(
      burgerConstructorReducer(state, removeIngredient('constructor-filling-1'))
    ).toEqual({ bun: null, ingredients: [] });
  });
  it('очищает конструктор', () => {
    const state = {
      bun: { ...bun, id: 'constructor-bun-1' },
      ingredients: [{ ...filling, id: 'constructor-filling-1' }]
    };
    expect(burgerConstructorReducer(state, clearConstructor())).toEqual({
      bun: null,
      ingredients: []
    });
  });
  it('перемещает ингредиент вверх', () => {
    const secondFilling = {
      ...filling,
      _id: 'filling-2',
      name: 'Соус',
      id: 'constructor-filling-2'
    };
    const state = {
      bun: null,
      ingredients: [{ ...filling, id: 'constructor-filling-1' }, secondFilling]
    };
    expect(
      burgerConstructorReducer(
        state,
        moveIngredient({ index: 1, direction: 'up' })
      )
    ).toEqual({
      bun: null,
      ingredients: [secondFilling, state.ingredients[0]]
    });
  });
  it('перемещает ингредиент вниз', () => {
    const secondFilling = {
      ...filling,
      _id: 'filling-2',
      name: 'Соус',
      id: 'constructor-filling-2'
    };
    const state = {
      bun: null,
      ingredients: [{ ...filling, id: 'constructor-filling-1' }, secondFilling]
    };
    expect(
      burgerConstructorReducer(
        state,
        moveIngredient({ index: 0, direction: 'down' })
      )
    ).toEqual({
      bun: null,
      ingredients: [secondFilling, state.ingredients[0]]
    });
  });
});
