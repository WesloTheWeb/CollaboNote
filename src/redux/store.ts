import { configureStore } from '@reduxjs/toolkit';
import countReducer from './slices/counterSlice';
import authReducer from './slices/authSlice';
import userSettingsReducer from './slices/userSettingsSlice';

const debugMiddleware = (store: any) => (next: any) => (action: any) => {
    const result = next(action);
    return result;
};

export const makeStore = () => {
    return configureStore({
        reducer: {
            count: countReducer,
            auth: authReducer,
            user: userSettingsReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(debugMiddleware),
    })
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];