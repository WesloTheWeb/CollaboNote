'use client';

import { useReducer } from 'react';
import classes from './Newsfeed.module.scss';
import UserCard from '../UserCard/UserCard';
import { sampleUsers, filterTabs } from '@/config/dashboard/sampleUserPostsConfig';
import { PersonalIcon, LocalIcon, TrendingIcon } from './NewsFeedFilterTab/TabIcons';

const { newsFeedTabContainer, newsFeedBody, tab, active, disabled, tabIcon } = classes;

// State type
type NewsFeedState = {
    activeTab: string;
    filteredUsers: typeof sampleUsers;
};

// Action types
type NewsFeedAction = 
    | { type: 'SET_ACTIVE_TAB'; payload: string }
    | { type: 'FILTER_USERS'; payload: string };

// Reducer function
const newsFeedReducer = (state: NewsFeedState, action: NewsFeedAction): NewsFeedState => {
    switch (action.type) {
        case 'SET_ACTIVE_TAB':
            return {
                ...state,
                activeTab: action.payload
            };
        case 'FILTER_USERS':
            // TODO: Add filtering logic based on tab
            // For now, return all users regardless of filter
            return {
                ...state,
                filteredUsers: sampleUsers
            };
        default:
            return state;
    }
};

// Initial state
const initialState: NewsFeedState = {
    activeTab: 'Personal',
    filteredUsers: sampleUsers
};

const NewsFeed = () => {
    const [state, dispatch] = useReducer(newsFeedReducer, initialState);

    const getTabIcon = (tabName: string) => {
        switch (tabName) {
            case 'Personal':
                return <PersonalIcon />;
            case 'Local':
                return <LocalIcon />;
            case 'Trending':
                return <TrendingIcon />;
            default:
                return <PersonalIcon />;
        }
    };

    const handleTabClick = (tabName: string, implemented: boolean) => {
        if (implemented) {
            dispatch({ type: 'SET_ACTIVE_TAB', payload: tabName });
            dispatch({ type: 'FILTER_USERS', payload: tabName });
        }
    };

    return (
        <div className={newsFeedBody}>
            <section className={newsFeedTabContainer}>
                {filterTabs.map(({ filterTabName, implemented }) => (
                    <button
                        key={filterTabName}
                        onClick={() => handleTabClick(filterTabName, implemented)}
                        disabled={!implemented}
                        type="button"
                        className={`${tab} ${state.activeTab === filterTabName ? active : ''} ${!implemented ? disabled : ''}`}
                    >
                        <span className={tabIcon}>
                            {getTabIcon(filterTabName)}
                        </span>
                        {filterTabName}
                    </button>
                ))}
            </section>
            <section>
                {state.filteredUsers.map(({
                    uuid,
                    username,
                    firstName,
                    lastname,
                    achievement,
                    avatar,
                    postDate,
                    membership,
                    messagePostBody 
                }) => (
                    <UserCard
                        key={uuid}
                        uuid={uuid}
                        username={username}
                        firstName={firstName}
                        lastName={lastname}
                        achievement={achievement}
                        avatar={avatar}
                        postDate={postDate}
                        membershipType={membership}
                        messagePostBody={messagePostBody}
                    />
                ))}
            </section>
        </div>
    );
};

export default NewsFeed;