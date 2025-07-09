# Проектная работа 11-го спринта

[Макет](<https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design>)

[Чеклист](https://www.notion.so/praktikum/0527c10b723d4873aa75686bad54b32e?pvs=4)

## Этапы работы:

1. Разверните проект и ознакомьтесь с кодом. Все необходимые вам компоненты уже созданы и лежат в папке `src/components`

2. Настройте роутинг.

3. Напишите функционал запросов данных с сервера, используя `Redux` и глобальный `store`. Сами "ручки" уже прописаны и лежат в `utils/burger-api.ts`

4. Настройте авторизацию и создайте защищённые роуты.

## Важно:

Для корректной работы запросов к серверу необходимо добавить переменную BURGER_API_URL в окружение. Сама ссылка находится в файле `.env.example`.


# Документация

### Используемые технологии:
1. React
2. TypeScript
3. Redux Toolkit
4. React Route


# Redux Toolkit

## 1. UserSlice

Модуль userSlice управляет состоянием аутентификации и данными пользователя в Redux-хранилище.
Он включает синхронные редюсеры для основных операций и обработку асинхронных действий 
(регистрация, вход, получение данных пользователя).

### Состояние (State)

```
interface TUser {
    name: string;
    email: string;
}

interface userState {
    data: TUser;
    isUserAuthorised: boolean;
    isUserChecked: boolean;
    userRegisterLoading: boolean;
    userRegisterError: Error | null;
    userLoginLoading: boolean;
    userLoginError: Error | null;
    userTokenLoading: boolean;
    userTokenError: Error | null;
}
```

### Начальное состояние

```
const initialState: userState = {
  data: {
    name: '',
    email: ''
  },
  isUserAuthorised: false,
  isUserChecked: false,
  userRegisterLoading: false,
  userRegisterError: null,
  userLoginLoading: false,
  userLoginError: null
  userTokenLoading: false,
  userTokenError: null,
};
```

### Синхронные действия (Reducers):
1. ```userLogout()``` - Очищает данные пользователя и сбрасывает флаг авторизации.
2. ```userUpdate(payload: TUser)``` - Обновляет данные пользователя и устанавливает флаг авторизации. Payload: объект с данными пользователя (name, email)

### Асинхронные действия (Extra Reducers):

У всех действий есть 3 состояния:
1.  ```pending``` - начинается загрузка
2. ```fulfilled``` - данные успешно получены
3. ```rejected``` - произошла ошибка

Действия:
1.  ```fetchUser``` - Получает данные пользователя
2. ```registerUser``` - Регистрирует нового пользователя
3. ```loginUser``` - Аутентифицирует пользователя.

### Селекторы:
1.  ```getUserState``` - Возвращает полное состояние слайса
2. ```getUser``` - Возвращает только данные пользователя.

## 2. BurgerConstructorSlice
управляет состоянием конструктора бургеров в приложении. 
Он отвечает за хранение и манипуляции с ингредиентами в текущем заказе.

### Состояние (State)

```
type TConstructorState = {
  bun: null | TIngredient;   
  ingredients: TConstructorIngredient[];
};
```
1. ```bun``` - выбранная булочка
2. ```ingredients``` - массив начинок и соусов
### Начальное состояние

```
const initialState: TConstructorState = {
  bun: null,       
  ingredients: [] 
};
```

### Синхронные действия (Reducers):
1. ```addBun(payload: TIngredient)``` - Добавляет/заменяет булку в конструкторе  
2. ```addConstructorIngredient(payload: TConstructorIngredient)``` - Добавляет ингредиент в конструктор
3. ```removeConstructorIngredient(payload: id)``` - Добавляет ингредиент в конструктор
4. ```resetConstructor``` - Сбрасывает конструктор в начальное состояние
5. ```moveConstructorIngredient(payload: index, type)``` - Добавляет ингредиент в конструктор. ```index``` - Текущая позиция ингредиента.
```type``` - Направление перемещения ('up' или 'down')

### Селекторы:
1.  ```getBun``` - Возвращает текущую выбранную булку
2. ```getConstructorIngredients``` - Возвращает массив ингредиентов (без булки)
3. ```getConstructorItems``` - Возвращает полное состояние конструктора


## 3. FeedSlice
Модуль feedSlice предоставляет Redux-логику для работы с лентой заказов

### Состояние (State)

```
{
  feedData: TOrdersData;
  isLoading: boolean;
  error: SerializedError | null;
}
```

### Начальное состояние

```
const initialState: FeedState = {
  data: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
}
```

### Селекторы:
1.  ```selectFeed``` - Возвращает полные данные о заказах
2. ```selectFeedOrders``` - Возвращает только массив заказов
3. ```selectFeedStatus``` - Возвращает объект с состоянием загрузки

### Асинхронные действия (Extra Reducers):

1.  ```fetchFeed``` -  для загрузки данных о заказах. Устанавливает ```isLoading = true```, 
выполняет API-запрос через ```getFeedsApi``` ,
при успехе сохраняет данные в ```data```,
при ошибке сохраняет информацию об ошибке


## 4. IngredientSlice
Модуль ingredientSlice предоставляет Redux-логику для работы с ингредиентами

### Состояние (State)

```
interface TIngredientState {
  items: TIngredient[];
  isLoading: boolean;
  error: SerializedError | null;
}   
```

### Начальное состояние

```
{
  items: [],       
  isLoading: false, 
  error: null    
}
```

### Селекторы:
1.  ```getIngredients``` - Возвращает массив всех ингредиентов
2. ```getIsLoadingInfo``` - Возвращает статус загрузки

### Асинхронные действия (Extra Reducers):

1.  ```fetchIngredients``` -  для загрузки списка ингредиентов. Устанавливает ```isLoading = true```,
сохраняет полученные данные в ```items``` при успехе,
сохраняет ошибку в ```error``` при неудаче,
устанавливает ```isLoading = false``` после завершения


## 5. OrderDetailsSlice
Модуль orderDetailsSlice предоставляет Redux-логику для работы с деталями заказа

### Состояние (State)

```
type OrderDetailsState = {
  orderDetails: TOrder | null; // Данные о заказе
  isLoading: boolean;         // Флаг загрузки
  error: SerializedError | null; // Информация об ошибке
};
```

### Начальное состояние

```
const initialOrderState: OrderDetailsState = {
  orderDetails: null,
  isLoading: false,
  error: null
};
```

### Синхронные действия (Reducers):
1. ```clearOrderDetails``` - Сбрасывает состояние деталей заказа ```orderDetails = null```, ```error = null```

### Селекторы:
1.  ```selectOrderDetails``` - Возвращает данные о заказе ```(TOrder | null)```
2. ```selectOrderLoadingState``` - Возвращает объект с состоянием загрузки

### Асинхронные действия (Extra Reducers):

1.  ```fetchOrderDetails``` -  Получает детали заказа по его номеру. Устанавливает ```isLoading = true```,
При успехе: сохраняет данные заказа в ```orderDetails``` и устанавливает ```isLoading = false```.
При ошибке: сохраняет информацию об ошибке и устанавливает ```isLoading = false```


## 6. ordersSlice
Модуль ordersSlice предоставляет управление состоянием заказов

### Состояние (State)

```
{
  orders: TOrder[];          // Массив всех заказов
  currentOrder: TOrder | null; // Текущий выбранный заказ
  loading: {
    fetch: boolean;         // Статус загрузки списка заказов
    create: boolean;        // Статус создания нового заказа
  };
  errors: {
    fetch: SerializedError | null;  // Ошибка загрузки
    create: SerializedError | null;  // Ошибка создания
  };
}
```

### Начальное состояние

```
{
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
}
```

### Синхронные действия (Reducers):
1. ```resetCurrentOrder``` - Сбрасывает текущий заказ 
2. ```resetErrors``` - Сбрасывает все ошибки

### Селекторы:
1.  ```getOrders``` - Возвращает массив всех заказов
2. ```getCurrentOrder``` - Возвращает текущий выбранный заказ ```TOrder | null)```
3. ```getIsLoadingOrders``` - Возвращает объект с состояниями загрузки ```{
  fetch: boolean;
  create: boolean;
}```
4. ```getErrorsOrders``` - Возвращает объект с ошибками

### Асинхронные действия (Extra Reducers):

1.  ```createOrder(ingredients: string[])``` -  Создает новый заказ. ```ingredients``` - массив ID ингредиентов. Устанавливает ```loading.create = true```,
    При успехе: сохраняет заказ в ```currentOrder``` и устанавливает ```loading.create = false```.
    При ошибке: сохраняет ошибку в ```errors.create``` и устанавливает ```loading.create = false```
2. ```fetchOrders``` -  Загружает список всех заказов. Устанавливает ```loading.fetch = true```,
    При успехе: Сохраняет заказы в ```orders``` и устанавливает ```loading.fetch  = false```.
    При ошибке: сохраняет ошибку в ```errors.fetch``` и устанавливает ```loading.fetch  = false```


# React Route

Маршруты:
1. ```  ``` - 

### Компонент ProtectedRoute
 Компонент принимает пропсы 
```
interface ProtectedRouteProps {
  children: React.ReactElement;
  isPublic?: boolean;
}
```
1. ```children``` - React-элемент, который будет отрендерен, если условия доступа удовлетворены
2. ```isPublic``` - необязательный флаг, указывающий, является ли маршрут публичным (доступным без авторизации)

У компонента есть 2 поля:
1. ```isUserChecked``` - флаг, указывающий, завершена ли проверка авторизации пользователя
2. ```user``` - объект с данными пользователя (email и name)

Компонент возвращает различные пути в зависимости от срабатываемых условий.
1. Пока проверка авторизации не завершена, отображается ```<Preloader/>```.
2. Если: маршрут не публичный `````!isPublic````` и пользователь не авторизован (проверяется по отсутствию email или name). 
То происходит перенаправление на страницу входа ```/login```, с сохранением информации 
о текущем местоположении ```state={{ from: location }}```
3. Если: маршрут публичный `````isPublic````` и пользователь авторизован.
То авторизованного пользователя перенаправляют:либо на страницу, указанную в ```location.state.from``` (если она есть) либо на главную страницу ```/```

