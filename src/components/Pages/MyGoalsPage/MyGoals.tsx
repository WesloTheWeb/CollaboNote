'use client';

import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { updateGoalStatus } from '@/redux/slices/myGoalsSlice';
import MyGoalsHeader from './MyGoalsHeader';
import GoalCard from '@/components/Cards/GoalCard/GoalCard';


const MyGoalsPage = ({ }) => {
    const { goals, showing } = useAppSelector((state) => state.goals);
    const dispatch = useAppDispatch();

    console.log(`[MyGoals.tsx] showing`, showing);

    // Filter goals based on showing state
    const getFilteredGoals = () => {
        switch (showing) {
            case 'show completed':
                return goals.filter(goal => goal.isGoalCompleted);
            case 'show ongoing':
                return goals.filter(goal => !goal.isGoalCompleted);
            default:
                return goals;
        }
    };

    const filteredGoals = getFilteredGoals();

    const handleStatusChange = (goalName: string, isCompleted: boolean) => {
        // TODO: When implementing database integration:
        // 1. Add async/await to this function
        // 2. Make API call to update goal status in database
        // 3. Handle loading states if needed
        // 4. Handle errors with try/catch and revert on failure

         dispatch(updateGoalStatus({ goalName, isCompleted }));

        // TODO: Add API call here
        // ! Remember we have a guest no access and a real user
    };
    return (
        <>
            <MyGoalsHeader />
            <section>
                {filteredGoals.map((goal) => {
                    return (
                        <GoalCard
                            key={goal.goalName}
                            goal={goal}
                            onStatusChange={handleStatusChange}
                        />
                    )
                })}
            </section>
        </>
    )
};

export default MyGoalsPage;