'use client';

import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import MyGoalsHeader from './MyGoalsHeader';
import { goalDummyData } from '@/config';
import classes from './MyGoalsPage.module.scss';
import GoalCard from '@/components/Cards/GoalCard/GoalCard';

const { } = classes;

const MyGoalsPage = ({ }) => {
    const [goals, setGoals] = useState(goalDummyData);
    const showing = useAppSelector((state) => state.goals.showing);

    console.log(`[MyGoals.tsx] showing`, showing);

    const handleStatusChange = (goalName: string, isCompleted: boolean) => {
        // TODO: When implementing database integration:
        // 1. Add async/await to this function
        // 2. Make API call to update goal status in database
        // 3. Handle loading states if needed
        // 4. Handle errors with try/catch and revert on failure

        setGoals((prevGoals) =>
            prevGoals.map(goal =>
                goal.goalName === goalName
                    ? {
                        ...goal,
                        isGoalCompleted: isCompleted,
                        goalStatus: isCompleted ? 'Completed' : 'On-going'
                    }
                    : goal
            )
        );

        // TODO: Add API call here
        // ! Remember we have a guest no access and a real user
        // Example: await updateGoalStatus(goalName, { isCompleted });
    };
    return (
        <>
            <MyGoalsHeader />
            <section>
                {goals.map((goal) => {
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