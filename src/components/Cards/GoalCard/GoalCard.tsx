'use client';

import { useState } from 'react';
import { goalCard } from '@/interfaces';
import { formatDate } from '@/utils/formatDateTime';
import { MoreVertical, Check, Undo } from 'lucide-react';
import classes from './GoalCard.module.scss';

interface goalCardProps {
    goal: goalCard;
    onStatusChange: (goalId: string, isCompleted: boolean) => void;
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

const GoalCard = ({ goal, onStatusChange }: goalCardProps) => {
    const { goalName, goalDescription, goalStatus, isGoalCompleted, goalCreatedOn } = goal;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const formattedDate = formatDate(goalCreatedOn);

    const handleMarkComplete = () => {
        onStatusChange?.(goal.goalName || '', true);
        setIsDropdownOpen(false);
    };

    const handleMarkIncomplete = () => {
        onStatusChange?.(goal.goalName || '', false);
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    return (
        <div className={goalCardContainer} onMouseLeave={closeDropdown}>
            <section className={goalCardHeader}>
                <div className={goalCardLeft}>
                    <button
                        className={actionsButton}
                        onClick={toggleDropdown}
                        aria-label="Goal actions"
                    >
                        <MoreVertical size={16} />
                    </button>
                    {isDropdownOpen && (
                        <div className={`${dropdown} ${dropdownOpen}`} onMouseLeave={closeDropdown}>
                            {!isGoalCompleted ? (
                                <button
                                    className={dropdownItem}
                                    onClick={handleMarkComplete}
                                >
                                    <Check size={14} />
                                    Mark Complete
                                </button>
                            ) : (
                                <button
                                    className={dropdownItem}
                                    onClick={handleMarkIncomplete}
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