import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

store.subscribe(() => {
    localStorage.setItem('userState', JSON.stringify(store.getState().user));
});