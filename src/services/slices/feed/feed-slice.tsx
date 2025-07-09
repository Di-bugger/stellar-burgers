import { TOrdersData } from '@utils-types';
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError
} from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';

interface FeedState {
  data: TOrdersData;
  loading: boolean;
  error: SerializedError | null;
}

const initialState: FeedState = {
  data: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: false,
  error: null
};

export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async (): Promise<TOrdersData> => {
    const { orders, total, totalToday } = await getFeedsApi();
    return { orders, total, totalToday };
  }
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeed: (state: FeedState) => state.data,
    getFeedOrders: (state: FeedState) => state.data.orders,
    selectFeedStatus: (state) => ({
      isLoading: state.loading,
      error: state.error
    })
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFeed.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  }
});

export const { getFeed, getFeedOrders } = feedSlice.selectors;
