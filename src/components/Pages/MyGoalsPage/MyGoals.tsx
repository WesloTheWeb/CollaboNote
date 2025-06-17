'use client';

import { useAppSelector } from '@/redux/hooks';
import MyGoalsHeader from './MyGoalsHeader';
import { goalDummyData } from '@/config';
import classes from './MyGoalsPage.module.scss';
import GoalCard from '@/components/GoalCard/GoalCard';

const { } = classes;

const MyGoalsPage = ({ }) => {

    const showing = useAppSelector((state) => state.goals.showing);
    console.log(`[MyGoals.tsx] showing`, showing)
    return (
        <>
            <MyGoalsHeader />
            <section>
                {goalDummyData.map((goal) => {
                    return (
                    <GoalCard 
                        key={goal.goalName}
                        goal={goal}
                    />
                )

                })}
            </section>
        </>
    )
};

export default MyGoalsPage;

// TODO - Needs a redux state. Filters are in MyGoalsHeader