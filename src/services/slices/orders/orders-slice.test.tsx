import {
  createOrder,
  fetchOrders,
  ordersSlice,
  resetOrderModalData
} from './orders-slice';
import { TOrder } from '@utils-types';

describe('ordersSlice reducer', () => {
  const initialState = ordersSlice.getInitialState();
  const fakeOrders: TOrder = {
    _id: '123',
    ingredients: ['abc', 'def'],
    status: 'done',
    name: 'Test Order',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    number: 1
  };

  //createOrder
  it('createOrder.pending', () => {
    const nextState = ordersSlice.reducer(
      initialState,
      createOrder.pending('', ['1', '2'])
    );
    expect(nextState.isNewOrderLoading).toBe(true);
    expect(nextState.newOrderError).toBeNull();
  });

  it('createOrder.fulfilled - - успешное сохранение ланных', () => {
    const nextState = ordersSlice.reducer(
      initialState,
      createOrder.fulfilled(fakeOrders, '', ['1', '2'])
    );
    expect(nextState.orderModalData).toEqual(fakeOrders);
    expect(nextState.isNewOrderLoading).toBe(false);
  });

  it('createOrder.rejected', () => {
    const error = new Error('Ошибка');
    const nextState = ordersSlice.reducer(
      initialState,
      createOrder.rejected(error, '', ['1', '2'])
    );
    expect(nextState.isNewOrderLoading).toBe(false);
    expect(nextState.newOrderError?.message).toBe(error.message);
  });

  //fetchOrders
  it('fetchOrders.pending', () => {
    const nextState = ordersSlice.reducer(
      initialState,
      fetchOrders.pending('', undefined)
    );
    expect(nextState.ordersLoading).toBe(true);
    expect(nextState.ordersError).toBeNull();
  });

  it('fetchOrders.fulfilled - успешное сохранение ланных', () => {
    const orders: TOrder[] = [fakeOrders];
    const nextState = ordersSlice.reducer(
      initialState,
      fetchOrders.fulfilled(orders, '', undefined)
    );
    expect(nextState.data).toEqual(orders);
    expect(nextState.ordersLoading).toBe(false);
  });

  it('fetchOrders.rejected', () => {
    const error = new Error('Ошибка');
    const nextState = ordersSlice.reducer(
      initialState,
      fetchOrders.rejected(error, '', undefined)
    );
    expect(nextState.ordersLoading).toBe(false);
    expect(nextState.ordersError?.message).toBe(error.message);
  });
});
