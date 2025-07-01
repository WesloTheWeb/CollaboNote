import { setShowAllGoals, setCompletedGoals, setOngoingGoals } from "@/redux/slices/myGoalsSlice";

export const myGoalsTabConfig = [
    {
        tabName: 'All Goals',
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
