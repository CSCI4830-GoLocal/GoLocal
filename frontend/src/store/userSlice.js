import { createSlice } from '@reduxjs/toolkit';


const loadState = () => {
    try {
        const serializedState = localStorage.getItem('userState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('userState', serializedState);
    } catch (e) {
        console.error(e);
    }
};


const initialState = loadState() || {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    error: null,
    isLoading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.password = action.payload.password;
            state.error = null;
            state.isLoading = false;
            saveState(state);
        },
        setError: (state, action) => {
            state.email = '';
            state.firstName = '';
            state.lastName = '';
            state.password = '';
            state.error = action.payload;
            state.isLoading = false;
            saveState(state);
        },
        clearUser: (state) => {
            state.email = '';
            state.firstName = '';
            state.lastName = '';
            state.password = '';
            state.error = null;
            state.isLoading = false;
            saveState(state);
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    },
});

export const { setUser, setError, clearUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
