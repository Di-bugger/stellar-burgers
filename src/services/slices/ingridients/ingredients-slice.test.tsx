import { fetchIngredients, ingredientSlice } from './ingridients-slice';
import { TIngredient } from '@utils-types';

describe('ingredientSlice reducer', () => {
  const initialState = {
    items: [],
    isLoading: false,
    error: null
  };

  it('fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fetchIngredients.fulfilled - успешное сохранение ланных', () => {
    const fakeData: TIngredient[] = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      }
    ];
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: fakeData
    };
    const state = ingredientSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(fakeData);
    expect(state.error).toBeNull();
  });

  it('fetchIngredients.rejected', () => {
    const error = 'Ошибка';

    const action = {
      type: fetchIngredients.rejected.type,
      error: error
    };
    const state = ingredientSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual(error);
  });
});
