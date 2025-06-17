type goalStatuses = 'Completed' | 'On-going';

export interface goalCard {
    goalName: string,
    goalDescription: string,
    goalStatus: goalStatuses,
    isGoalCompleted: boolean,
    goalCreatedOn: Date | string
};