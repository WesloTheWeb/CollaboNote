import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserSettings {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    bio?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface UserSettingsState {
    userSettings: UserSettings | null;
    isLoading: boolean;
    isUpdating: boolean;
    error: string | null;
    updateSuccess: boolean;
}

const initialState: UserSettingsState = {
    userSettings: null,
    isLoading: false,
    isUpdating: false,
    error: null,
    updateSuccess: false,
};

const userSettingsSlice = createSlice({
    name: 'userSettings',
    initialState,
    reducers: {
        // Load user settings
        loadUserSettingsStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loadUserSettingsSuccess: (state, action: PayloadAction<UserSettings>) => {
            state.isLoading = false;
            state.userSettings = action.payload;
            state.error = null;
        },
        loadUserSettingsFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Update user settings
        updateUserSettingsStart: (state) => {
            state.isUpdating = true;
            state.error = null;
            state.updateSuccess = false;
        },
        updateUserSettingsSuccess: (state, action: PayloadAction<UserSettings>) => {
            state.isUpdating = false;
            state.userSettings = action.payload;
            state.error = null;
            state.updateSuccess = true;
        },
        updateUserSettingsFailure: (state, action: PayloadAction<string>) => {
            state.isUpdating = false;
            state.error = action.payload;
            state.updateSuccess = false;
        },

        // Clear update success message
        clearUpdateSuccess: (state) => {
            state.updateSuccess = false;
        },

        // Clear error
        clearError: (state) => {
            state.error = null;
        },

        // Reset state
        resetUserSettings: (state) => {
            state.userSettings = null;
            state.isLoading = false;
            state.isUpdating = false;
            state.error = null;
            state.updateSuccess = false;
        },
    },
});

export const {
    loadUserSettingsStart,
    loadUserSettingsSuccess,
    loadUserSettingsFailure,
    updateUserSettingsStart,
    updateUserSettingsSuccess,
    updateUserSettingsFailure,
    clearUpdateSuccess,
    clearError,
    resetUserSettings,
} = userSettingsSlice.actions;

export default userSettingsSlice.reducer;