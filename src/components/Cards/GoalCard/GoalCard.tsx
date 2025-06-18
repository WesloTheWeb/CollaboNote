'use client';

import { useState } from 'react';
import { goalCard } from '@/interfaces';
import { formatDate } from '@/utils/formatDateTime';
import { MoreVertical, Check, Undo } from 'lucide-react';
import classes from './GoalCard.module.scss';

interface goalCardProps {
    goal: goalCard;
    // TODO: Add onStatusChange prop when Redux actions are implemented
    // onStatusChange?: (goalId: string, isCompleted: boolean) => void;
};

const {
    goalCardContainer,
    goalCardHeader,
    goalCardLeft,
    goalCardInfo,
    goalCard_Status,
    goalCard_completed_marker,
    goalCard_in_progress_marker,
    actionsButton,
    dropdown,
    dropdownOpen,
    dropdownItem,
    goalCardDescription
} = classes;


// TODO: Add in dropdown to go with background
const GoalCard = ({ goal }: goalCardProps) => {
    const { goalName, goalDescription, goalStatus, isGoalCompleted, goalCreatedOn } = goal;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const formattedDate = formatDate(goalCreatedOn);

    // TODO: Implement these functions when Redux actions are ready
    //TODO: Add hover off effect of dropdown.
    // const handleMarkComplete = () => {
    //     onStatusChange?.(goal.goalId || '', true);
    //     setIsDropdownOpen(false);
    // };

    // const handleMarkIncomplete = () => {
    //     onStatusChange?.(goal.goalId || '', false);
    //     setIsDropdownOpen(false);
    // };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className={goalCardContainer}>
            <section className={goalCardHeader}>
                <div className={goalCardLeft}>
                    {/* TODO: Add onClick={toggleDropdown} when functionality is implemented */}
                    <button
                        className={actionsButton}
                        onClick={toggleDropdown}
                        aria-label="Goal actions"
                    >
                        <MoreVertical size={16} />
                    </button>
                    {/* TODO: Show dropdown when isDropdownOpen state is implemented */}
                    {isDropdownOpen && (
                        <div className={`${dropdown} ${dropdownOpen}`}>
                            {!isGoalCompleted ? (
                                <button
                                    className={dropdownItem}
                                // TODO: Add onClick={handleMarkComplete} when function is implemented
                                >
                                    <Check size={14} />
                                    Mark Complete
                                </button>
                            ) : (
                                <button
                                    className={dropdownItem}
                                // TODO: Add onClick={handleMarkIncomplete} when function is implemented
                                >
                                    <Undo size={14} />
                                    Mark Incomplete
                                </button>
                            )}
                        </div>
                    )}
                    <div className={goalCardInfo}>
                        <h4>{goalName}</h4>
                        <sub>{formattedDate}</sub>
                    </div>
                </div>
                <div className={`${goalCard_Status} ${isGoalCompleted ? goalCard_completed_marker : goalCard_in_progress_marker}`}>
                    {goalStatus}
                </div>
            </section>
            <section className={goalCardDescription}>
                <p>
                    {goalDescription}
                </p>
            </section>
        </div>
    );
};

export default GoalCard;