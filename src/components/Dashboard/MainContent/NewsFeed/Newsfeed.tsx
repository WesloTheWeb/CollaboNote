'use client';

import Button from '@/components/Button/Button';
import classes from './Newsfeed.module.scss';
import UserCard from '../UserCard/UserCard';
import { sampleUsers } from '@/config/dashboard/sampleUserPostsConfig';

const { newsFeedTabContainer, newsFeedBody } = classes;

const NewsFeed = ({ }) => {

    //TODO - Fetch from here, think about folder structure order.

    return (
        <div className={newsFeedBody}>
            <section className={newsFeedTabContainer}>
                {/* These can be its own component */}
                <Button
                    fn={() => { }}
                    type='button'
                >
                    Personal
                </Button>
                <Button
                    fn={() => { }}
                    type='button'
                >
                    Local
                </Button>
                <Button
                    fn={() => { }}
                    type='button'
                >
                    Trending
                </Button>
            </section>
            <section>
                {
                    sampleUsers.map(({
                        uuid,
                        username,
                        firstName,
                        lastname,
                        achievement,
                        avatar,
                        postDate,
                        membership,
                        messagePostBody }) => {
                        return (
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
                        )
                    })
                }
                {/*todo Profile Cards component */}
            </section>
        </div>
    );
};

export default NewsFeed;