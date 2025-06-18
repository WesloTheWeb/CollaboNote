import { goalCard } from '@/interfaces';
import { formatDate } from '@/utils/formatDateTime';
import classes from './GoalCard.module.scss';

const { 
    goalCardContainer,
    goalCardHeader,
    goalCard_Status,
    goalCard_completed_marker,
    goalCard_in_progress_marker
} = classes;

interface goalCardProps {
    goal: goalCard
};


const GoalCard = ({ goal }: goalCardProps) => {
    const { goalName, goalDescription, goalStatus, isGoalCompleted, goalCreatedOn } = goal;

    const formattedDate = formatDate(goalCreatedOn);

    return (
        <div className={goalCardContainer}>
            <section className={goalCardHeader}>
                <div>
                    <h4>{goalName}</h4>
                    <sub>{formattedDate}</sub>
                </div>
                <div className={`${goalCard_Status} ${isGoalCompleted ? goalCard_completed_marker : goalCard_in_progress_marker}`}>
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