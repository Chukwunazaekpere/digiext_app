import React, { FC, useState, useEffect } from 'react';
import { ViewProps } from 'react-native';

import DashboardHeaderUpperArc from './layouts/DashboardHeaderUpperArc';
import DashboardHeader from './layouts/DashboardHeader';

import { greetingMessage, getTodaysDate, getCurrentTime } from "../helpers/utilityFunctions";
import Animated from 'react-native-reanimated';

interface Props extends ViewProps {
    style?: any
    upperArc?: boolean
};

const RecursiveDateTimeComponent: FC<Props> = ({children, upperArc,style}) => {
    const [time, setTime] = useState({}as any);
    const [date, setDate] = useState({}as any);
    const [greetMessage, setGreetMessage] = useState("");
    const [reRender, setReRender] = useState(true);

    const recursive = async () => {
        const { actualHour, actualMinute, AmPmStatus } = getCurrentTime();
        const { dayOfTheWeek, thisYear, monthOfTheYear, todaysDate } = getTodaysDate();
        const greetMessage = greetingMessage();
        const clock = { actualHour, actualMinute, AmPmStatus };
        const calendar = { dayOfTheWeek, thisYear, monthOfTheYear, todaysDate };
        setTime({
            ...clock
        });

        setDate({
            ...calendar
        });
        setGreetMessage(greetMessage);
        setReRender(!reRender);
        // dispatcher();
        // console.log("\n\t Recursive called...");
        
    };

    useEffect(() => {
        setTimeout(() => {
            recursive();
        }, 7000);
    }, [reRender]);
    
    return(
        <Animated.View onLayout={() => recursive()} {...style}>
            {
                upperArc ?
                <DashboardHeaderUpperArc timeData={time} dateData={date} greetData={greetMessage} />
                :
                <DashboardHeader timeData={time} dateData={date} greetData={greetMessage} />
            }
        </Animated.View>
    )
};



export default RecursiveDateTimeComponent;