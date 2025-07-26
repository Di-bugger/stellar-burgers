import { TUser } from '@utils-types';
import { fetchUser, loginUser, registerUser, userSlice } from './user-slice';

describe('userSlice reducer', () => {
  const initialState = userSlice.getInitialState();
  const fakeUser: TUser = {
    name: 'Fake user',
    email: 'fake@example.com'
  };

  //fetchUser
  it('fetchUser.pending', () => {
    const nextState = userSlice.reducer(
      initialState,
      fetchUser.pending('', undefined)
    );
    expect(nextState.userTokenLoading).toBe(true);
    expect(nextState.userTokenError).toBeNull();
  });

  it('fetchUser.fulfilled - успешное сохранение ланных', () => {
    const nextState = userSlice.reducer(
      initialState,
      fetchUser.fulfilled(fakeUser, '', undefined)
    );
    expect(nextState.data).toEqual(fakeUser);
    expect(nextState.isUserChecked).toBe(true);
    expect(nextState.isUserAuthorised).toBe(true);
    expect(nextState.userTokenLoading).toBe(false);
  });

  it('fetchUser.rejected', () => {
    const error = new Error('Ошибка');

    const nextState = userSlice.reducer(
      initialState,
      fetchUser.rejected(error, '', undefined)
    );
    expect(nextState.userTokenLoading).toBe(false);
    expect(nextState.userTokenError?.message).toEqual(error.message);
    expect(nextState.isUserChecked).toBe(true);
    expect(nextState.isUserAuthorised).toBe(false);
  });

  //registerUser
  it('registerUser.pending', () => {
    const nextState = userSlice.reducer(
      initialState,
      registerUser.pending('', {} as any)
    );
    expect(nextState.userRegisterLoading).toBe(true);
    expect(nextState.userRegisterError).toBeNull();
  });

  it('registerUser.fulfilled - успешное сохранение ланных пользователя - регистрация', () => {
    const nextState = userSlice.reducer(
      initialState,
      registerUser.fulfilled(fakeUser, '', {} as any)
    );
    expect(nextState.data).toEqual(fakeUser);
    expect(nextState.isUserAuthorised).toBe(true);
    expect(nextState.userRegisterLoading).toBe(false);
    expect(nextState.userRegisterError).toBeNull();
  });

  it('registerUser.rejected', () => {
    const error = new Error('Ошибка');

    const nextState = userSlice.reducer(
      initialState,
      registerUser.rejected(error, '', {} as any)
    );
    expect(nextState.userRegisterLoading).toBe(false);
    expect(nextState.userRegisterError?.message).toEqual(error.message);
  });

  //loginUser
  it('должен установить флаг загрузки при loginUser.pending', () => {
    const nextState = userSlice.reducer(
      initialState,
      loginUser.pending('', {} as any)
    );
    expect(nextState.userLoginLoading).toBe(true);
    expect(nextState.userLoginError).toBeNull();
  });

  it('loginUser.fulfilled - успешное сохранение ланных пользователя - авторизация', () => {
    const nextState = userSlice.reducer(
      initialState,
      loginUser.fulfilled(fakeUser, '', {} as any)
    );
    expect(nextState.data).toEqual(fakeUser);
    expect(nextState.isUserAuthorised).toBe(true);
    expect(nextState.userLoginLoading).toBe(false);
    expect(nextState.userLoginError).toBeNull();
  });

  it('loginUser.rejected', () => {
    const error = new Error('Ошибка');
    const nextState = userSlice.reducer(
      initialState,
      loginUser.rejected(error, '', {} as any)
    );
    expect(nextState.userLoginLoading).toBe(false);
    expect(nextState.userLoginError?.message).toEqual(error.message);
  });
});
