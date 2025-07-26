import { feedSlice, fetchFeed } from './feed-slice';
import { TOrdersData } from '@utils-types';

describe('feedSlice', () => {
  const initialState = feedSlice.getInitialState();

  it('fetchFeed.pending', () => {
    const nextState = feedSlice.reducer(
      initialState,
      fetchFeed.pending('', undefined)
    );
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('fetchFeed.fulfilled - успешное сохранение ланных', () => {
    const fakeData: TOrdersData = {
      orders: [
        {
          _id: '1',
          ingredients: ['643d69a5c3f7b9001cfa093c'],
          status: 'done',
          name: 'Краторный био-марсианский бургер',
          createdAt: '2025-25-07',
          updatedAt: '2025-25-07',
          number: 85091
        }
      ],
      total: 85591,
      totalToday: 380
    };

    const nextState = feedSlice.reducer(
      initialState,
      fetchFeed.fulfilled(fakeData, '', undefined)
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.feedData).toEqual(fakeData);
  });

  it('fetchFeed.rejected', () => {
    const error = new Error('Ошибка');

    const nextState = feedSlice.reducer(
      initialState,
      fetchFeed.rejected(error, 'rejected')
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error?.message).toEqual(error.message);
  });
});
