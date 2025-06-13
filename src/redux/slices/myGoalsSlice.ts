import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type myGoalsStates = 'show all' | 'show completed' | 'show ongoing';

interface myGoalsState {
    showing: myGoalsStates,
};

const initialState: myGoalsState = {
    showing: 'show all',
};

const myGoalsSlice = createSlice({
    name: 'myGoals',
    initialState,
    reducers: {
        setShowAllGoals: (state) => {
            state.showing = 'show all'
        },
        setCompletedGoals: (state) => {
            state.showing = 'show completed'
        },
        setOngoingGoals: (state) => {
            state.showing = 'show ongoing'
        }
    }
});

export const { setShowAllGoals, setCompletedGoals, setOngoingGoals } = myGoalsSlice.actions;
export default myGoalsSlice.reducer;

// ! Review redux it is also 7am I am tired

// 1. If we are changing the state.showing would we need to have it on the PayloadAction?