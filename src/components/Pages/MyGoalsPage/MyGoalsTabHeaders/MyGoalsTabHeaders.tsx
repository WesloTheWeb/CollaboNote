'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { myGoalsTabConfig } from "@/config"
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import classes from './MyGoalsTabHeaders.module.scss';

interface MyGoalsTabProps {
    tabName: string,
    action: ActionCreatorWithoutPayload<string>,
    isActive: boolean
};

const { tabContainer, tabButton, active } = classes;

const MyGoalsTab = ({tabName, action, isActive}: MyGoalsTabProps) => {
    const dispatch = useAppDispatch();

    return (
        <button
            className={`${tabButton} ${isActive ? active : ''}`}
            onClick={() => dispatch(action())}
        >
            {tabName}
        </button>
    )
}

const MyGoalsTabHeaders = ({}) => {
    const showing = useAppSelector((state) => state.goals.showing);

    // Map showing state to tab names for active state check
    const getTabState = (tabName: string) => {
        const stateMap: Record<string, string> = {
            'All Goals': 'show all',
            'Completed': 'show completed',
            'Ongoing': 'show ongoing'
        };
        return showing === stateMap[tabName];
    };

    return (
        <section className={tabContainer}>
            {myGoalsTabConfig.map(({tabName, action}) => {
                return (
                    <MyGoalsTab 
                        key={tabName}
                        tabName={tabName}
                        action={action}
                        isActive={getTabState(tabName)}
                    />
                )
            })}
        </section>
    );
};

export default MyGoalsTabHeaders;