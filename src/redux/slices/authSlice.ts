import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user: {
        id: string;
        email: string;
        name: string;
    } | null;
    status: 'loading' | 'authenticated' | 'unauthenticated';
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    status: 'loading'
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticated: (state, action: PayloadAction<{ user: AuthState['user'] }>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.status = 'authenticated';
        },
        setUnauthenticated: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.status = 'unauthenticated';
        },
        setLoading: (state) => {
            state.status = 'loading';
        }
    }
});

export const { setAuthenticated, setUnauthenticated, setLoading } = authSlice.actions;
export default authSlice.reducer;