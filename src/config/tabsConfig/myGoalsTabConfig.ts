import { setShowAllGoals, setCompletedGoals, setOngoingGoals } from "@/redux/slices/myGoalsSlice";

export const myGoalsTabConfig = [
    {
        tabName: 'My Goals',
        action: setShowAllGoals
    },
    {
        tabName: 'Completed',
        action: setCompletedGoals
    },
    {
        tabName: 'Ongoing',
        action: setOngoingGoals
    }
];
