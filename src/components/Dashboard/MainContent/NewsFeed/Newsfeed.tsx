'use client';

import { useReducer } from 'react';
import classes from './Newsfeed.module.scss';
import UserCard from '../UserCard/UserCard';
import { sampleUsers, filterTabs } from '@/config/dashboard/sampleUserPostsConfig';
import { PersonalIcon, LocalIcon, TrendingIcon } from './NewsFeedFilterTab/TabIcons';
import { NewsFeedState, NewsFeedAction, NewsfeedProps } from '@/interfaces';

const { newsFeedTabContainer, newsFeedBody, tab, active, disabled, tabIcon } = classes;

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
                filteredUsers: state.filteredUsers
            };
        default:
            return state;
    }
};

const NewsFeed = ({ users }: NewsfeedProps) => {
    const initialState: NewsFeedState = {
        activeTab: 'Personal',
        filteredUsers: users || sampleUsers
    };

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
                    lastName,
                    achievement,
                    avatar,
                    postDate,
                    membership,
                    timeOfPost,
                    messagePostBody
                }) => (
                    <UserCard
                        key={uuid}
                        uuid={uuid}
                        username={username}
                        firstName={firstName}
                        lastName={lastName}
                        achievement={achievement}
                        avatar={avatar}
                        postDate={postDate}
                        membership={membership}
                        timeOfPost={timeOfPost}
                        messagePostBody={messagePostBody}
                    />
                ))}
            </section>
        </div>
    );
};

export default NewsFeed;