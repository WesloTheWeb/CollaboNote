'use client';

import Button from '@/components/Button/Button';
import classes from './Newsfeed.module.scss';

const {newsFeedTabContainer, newsFeedBody } = classes;

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
                {/*todo Profile Cards component */}
            </section>
        </div>
    );
};

export default NewsFeed;