import { goalCard } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { goalDummyData } from "@/config/sampleConfig/userGoalsConfig";

type myGoalsStates = 'show all' | 'show completed' | 'show ongoing';

interface myGoalsState {
    showing: myGoalsStates,
    goals: goalCard[]
};

// Safely handle potentially undefined import
const safeGoalData = Array.isArray(goalDummyData) ? goalDummyData : [];

const initialState: myGoalsState = {
    showing: 'show all',
    goals: safeGoalData
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
        },
        updateGoalStatus: (state, action: PayloadAction<{ goalName: string; isCompleted: boolean }>) => {
            const { goalName, isCompleted } = action.payload;
            const goal = state.goals.find(g => g.goalName === goalName);
            if (goal) {
                goal.isGoalCompleted = isCompleted;
                goal.goalStatus = isCompleted ? 'Completed' : 'On-going';
            }
        }
    }
});

export const { setShowAllGoals, setCompletedGoals, setOngoingGoals, updateGoalStatus } = myGoalsSlice.actions;
export default myGoalsSlice.reducer;