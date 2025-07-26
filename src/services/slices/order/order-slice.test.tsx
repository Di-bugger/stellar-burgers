import { fetchOrderDetails, orderSlice } from './order-slice';
import { TOrder } from '@utils-types';

describe('orderSlice', () => {
  const initialState = orderSlice.getInitialState();
  const fakeOrder: TOrder = {
    _id: '1',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      'Биокотлета из марсианской Магнолии'
    ],
    status: 'done',
    name: 'Краторный био-марсианский бургер',
    createdAt: '2025-25-07',
    updatedAt: '2025-25-07',
    number: 1234
  };

  it('fetchOrderDetails.pending', () => {
    const nextState = orderSlice.reducer(
      initialState,
      fetchOrderDetails.pending('', 9999)
    );
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('fetchOrderDetails.fulfilled - успешное сохранение ланных', () => {
    const nextState = orderSlice.reducer(
      initialState,
      fetchOrderDetails.fulfilled(fakeOrder, '', 9999)
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.data).toEqual(fakeOrder);
  });

  it('fetchOrderDetails.rejected', () => {
    const error = new Error('Ошибка');
    const nextState = orderSlice.reducer(
      initialState,
      fetchOrderDetails.rejected(error, '', 9999)
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error?.message).toBe(error.message);
  });
});
