import { ingredientSlice } from './slices/ingridients/ingridients-slice';
import { burgerConstructorSlice } from './slices/constructor/constructor-slice';
import { feedSlice } from './slices/feed/feed-slice';
import { userSlice } from './slices/user/user-slice';
import { ordersSlice } from './slices/orders/orders-slice';
import { orderSlice } from './slices/order/order-slice';
import { rootReducer } from './store';

describe('rootReducer', () => {
  it('Проверяют правильную инициализацию', () => {
    const initialState = {
      [ingredientSlice.name]: ingredientSlice.getInitialState(),
      [burgerConstructorSlice.name]: burgerConstructorSlice.getInitialState(),
      [feedSlice.name]: feedSlice.getInitialState(),
      [userSlice.name]: userSlice.getInitialState(),
      [ordersSlice.name]: ordersSlice.getInitialState(),
      [orderSlice.name]: orderSlice.getInitialState()
    };

    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const result = rootReducer(undefined, unknownAction);

    expect(result).toEqual(initialState);
  });
});
