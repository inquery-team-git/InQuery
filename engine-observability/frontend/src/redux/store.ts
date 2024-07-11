// #region Global Imports
import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import type { NextPageContext } from 'next';
import type { AppInitialProps } from 'next/app';
import { createWrapper } from 'next-redux-wrapper';
import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducers from './reducers';

const makeConfiguredStore = () => {
  return configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export const makeStore = () => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return makeConfiguredStore();
  }
  // we need it only on client side
  const persistConfig = {
    key: 'inquery',
    blacklist: ['form'],
    whitelist: ['auth', 'adminRoles', 'adminMembers', 'companyLabels'], // make sure it does not clash with server keys
    storage,
  };
  const persistedReducer = persistReducer(persistConfig, reducers);
  const store: any = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  // Nasty hack
  // eslint-disable-next-line no-underscore-dangle
  store.__persistor = persistStore(store);
  return store;
};

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<AppStore['getState']>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export interface AppWithStore extends AppInitialProps {
  store: AppStore;
}

export interface ReduxNextPageContext extends NextPageContext {
  store: AppStore;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: { users: UsersState}
type AppDispatch = typeof store.dispatch;

// Since we use typescript, lets utilize `useDispatch`
export const useDispatch = () => useDispatchBase<AppDispatch>();

// And utilize `useSelector`
export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);

export const wrapper = createWrapper<AppStore>(makeStore);
