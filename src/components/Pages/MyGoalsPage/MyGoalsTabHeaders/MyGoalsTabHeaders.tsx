'use client';

import { useDispatch } from "react-redux";
import { myGoalsTabConfig } from "@/config"
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";

interface MyGoalsTabProps {
    tabName: string,
    action: ActionCreatorWithoutPayload<string>
};

const MyGoalsTab = ({tabName, action}: MyGoalsTabProps) => {
        const dispatch = useDispatch();

    return (
        <button
            onClick={() => dispatch(action())}
        >
            {tabName}
        </button>
    )
}

const MyGoalsTabHeaders = ({}) => {

    return (
        <section>
            {myGoalsTabConfig.map(({tabName, action}) => {
                return (
                    <MyGoalsTab 
                        key={tabName}
                        tabName={tabName}
                        action={action}
                    />
                )
            })}
        </section>
    );
};

export default MyGoalsTabHeaders;