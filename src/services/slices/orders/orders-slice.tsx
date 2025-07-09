import { getOrdersApi, orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

// Тип состояния для заказов
type OrdersState = {
  orders: TOrder[]; // Список всех заказов
  currentOrder: TOrder | null; // Текущий выбранный заказ
  loading: {
    fetch: boolean; // Загрузка списка заказов
    create: boolean; // Создание нового заказа
  };
  errors: {
    fetch: SerializedError | null; // Ошибка при загрузке
    create: SerializedError | null; // Ошибка при создании
  };
};

// Начальное состояние
const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
  loading: {
    fetch: false,
    create: false
  },
  errors: {
    fetch: null,
    create: null
  }
};

// Thunk для создания нового заказа
export const createOrder = createAsyncThunk(
  'orders/create',
  async (ingredients: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredients);
      if (!response.success) {
        return rejectWithValue('Не удалось создать заказ');
      }
      return response.order;
    } catch (error) {
      return rejectWithValue('Ошибка сети при создании заказа');
    }
  }
);

// Thunk для загрузки списка заказов
export const fetchOrders = createAsyncThunk(
  'orders/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await getOrdersApi();
    } catch (error) {
      return rejectWithValue('Не удалось загрузить заказы');
    }
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Сброс текущего заказа
    resetCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    // Сброс ошибок
    resetErrors: (state) => {
      state.errors.fetch = null;
      state.errors.create = null;
    }
  },
  selectors: {
    // Селектор всех заказов
    getOrders: (state) => state.orders,
    // Селектор текущего заказа
    getCurrentOrder: (state) => state.currentOrder,
    // Селектор состояний загрузки
    getIsLoadingOrders: (state) => state.loading,
    // Селектор ошибок
    getErrorsOrders: (state) => state.errors
  },
  extraReducers: (builder) => {
    builder
      // Обработка создания заказа
      .addCase(createOrder.pending, (state) => {
        state.loading.create = true;
        state.errors.create = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading.create = false;
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading.create = false;
        state.errors.create = action.error;
      })

      // Обработка загрузки заказов
      .addCase(fetchOrders.pending, (state) => {
        state.loading.fetch = true;
        state.errors.fetch = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading.fetch = false;
        state.errors.fetch = action.error;
      });
  }
});

// Экспорт селекторов
export const {
  getCurrentOrder,
  getOrders,
  getErrorsOrders,
  getIsLoadingOrders
} = ordersSlice.selectors;

// Экспорт действий
export const { resetCurrentOrder, resetErrors } = ordersSlice.actions;

// Экспорт редюсера
export default ordersSlice.reducer;
