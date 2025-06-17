import { goalCard } from '@/interfaces';
import { formatDate } from '@/utils/formatDateTime';
import classes from './GoalCard.module.scss';

const { } = classes;

interface goalCardProps {
    goal: goalCard
};


const GoalCard = ({goal}: goalCardProps) => {
    const { goalName, goalDescription, goalStatus, isGoalCompleted, goalCreatedOn } = goal;

    const formattedDate = formatDate(goalCreatedOn);

    return (
        <div>
            <section>
                <div>
                    <h4>{goalName}</h4>
                    <sub>{formattedDate}</sub>
                </div>
                <div>
                    {goalStatus}
                </div>
            </section>
            <section>
                <p>
                    {goalDescription}
                </p>
            </section>
        </div>
    )
};

export default GoalCard;