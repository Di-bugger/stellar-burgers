import { TOrder } from '@utils-types';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';

type OrderDetailsState = {
  orderDetails: TOrder | null;
  isLoading: boolean;
  error: SerializedError | null;
};

const initialOrderState: OrderDetailsState = {
  orderDetails: null,
  isLoading: false,
  error: null
};

export const fetchOrderDetails = createAsyncThunk(
  'orderDetails/fetch',
  async (orderNumber: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(orderNumber);
      if (!response.success) {
        return rejectWithValue('Failed to fetch order details');
      }
      return response.orders[0];
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState: initialOrderState,
  reducers: {
    clearOrderDetails: (state) => {
      state.orderDetails = null;
      state.error = null;
    }
  },
  selectors: {
    selectOrderDetails: (state) => state.orderDetails,
    selectOrderLoadingState: (state) => ({
      isLoading: state.isLoading,
      error: state.error
    })
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export const { selectOrderDetails, selectOrderLoadingState } =
  orderDetailsSlice.selectors;
export const { clearOrderDetails } = orderDetailsSlice.actions;
export const orderDetailsReducer = orderDetailsSlice.reducer;
