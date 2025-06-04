export type NewsFeedState = {
    activeTab: string,
    filteredUsers: UserType[]
};

export type NewsFeedAction =
    | { type: 'SET_ACTIVE_TAB'; payload: string }
    | { type: 'FILTER_USERS'; payload: string };

export type UserType = {
    uuid: number,
    username: string,
    firstName: string,
    lastName: string,
    achievement: null | string,
    avatar: string,
    postDate: string | Date,
    membership: string,
    timeOfPost: string,
    messagePostBody: string
};

export type NewsfeedProps = {
    users: UserType[]
};