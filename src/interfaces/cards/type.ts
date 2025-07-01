type goalStatuses = 'Completed' | 'On-going';

export interface goalCard {
    goalId: string;
    goalName: string,
    goalDescription: string,
    goalStatus: goalStatuses,
    isGoalCompleted: boolean,
    goalCreatedOn: Date | string
};