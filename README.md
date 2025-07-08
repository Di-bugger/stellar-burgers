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
То авторизованного пользователя перенаправляют:либо на страницу, 
4. указанную в ```location.state.from``` (если она есть) либо на главную страницу ```/```

