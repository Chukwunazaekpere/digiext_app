
export const titleCase = (word: string) => {
    const firstLetter = word[0].toUpperCase();
    const otherLetters = word.substr(1);

    const titleCasedWord = firstLetter + otherLetters;
    return titleCasedWord;
};

const dayInWords = (numericalDayOfTheWeek: number) => {
    switch(numericalDayOfTheWeek){
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Please enter a number between 1 and 7 to get a day of the week";
    };
};

const monthInWords = (numericalMonthOfTheYear: number) => {
    switch(numericalMonthOfTheYear){
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        case 12:
            return "December";
        default:
            return "Please enter a number between 1 and 12 to get a month of the year."
    };
};

/***
 * Greet a user appropriately w.r.t the current time
 */
export const greetingMessage = () => {
    const { hourTime } = dateTimeComputation();
    
    if(hourTime < 12){
        return "Good Morning";
    }else if(hourTime >= 12 && hourTime < 16){
        return "Good Afternoon";
    }else{
        return "Good evening";
    };
};

export const getTodaysDate = () => {
    const {hourTime, minuteTime, dayOfTheWeek, monthOfTheYear, thisYear, todaysDate} = dateTimeComputation();
    // console.log("\n\t todaysDate: ", todaysDate);
    
    const stringedDate = {hourTime, minuteTime, dayOfTheWeek, monthOfTheYear, thisYear, todaysDate}
    return stringedDate;
};

export const getCurrentTime = () => {
        const {hourTime, minuteTime } = dateTimeComputation();
        // console.log("\n\t hourTime: ", hourTime);
        
        let AmPmStatus = undefined;
        let actualHour = 0;
        if(hourTime > 12){
            actualHour = hourTime - 12; 
            AmPmStatus = "p.m."
        }else{
            actualHour = hourTime;
            if(actualHour === 0){
                actualHour = 12;
            }
            AmPmStatus = "a.m."
        };

        let actualMinute = ""
        if(minuteTime < 10){
            actualMinute = "0" + String(minuteTime);
        }else{
            actualMinute = String(minuteTime);
        };
        
        const currentTime = {actualHour, actualMinute, AmPmStatus }
        return currentTime;
};

const dateNumericalAcronym = (numericalDate: number) => {
    const acronym = ["st", "th", "nd", "rd"];

    if(numericalDate === 1 || numericalDate === 21 || numericalDate === 31){
        return acronym[0];
    }else if(numericalDate === 3 || numericalDate === 23){
        return acronym[3];
    }else if(numericalDate === 2 || numericalDate === 22){
        return acronym[2];
    }else if(String(numericalDate).includes("2") && String(numericalDate).includes("1")){
        return acronym[0];
    }else{
        return acronym[1];
    };
};


export const dateTimeComputation = () => {
    const dateTime = new Date();
    const thisYear = dateTime.getFullYear()
    const todaysDate = dateTime.getDate();

    const dateAcronym = dateNumericalAcronym(todaysDate);
    const todaysDateAndAcronym = `${todaysDate}${dateAcronym}`;

    const dayOfTheWeek = dayInWords(dateTime.getDay());
    const monthOfTheYear = monthInWords(dateTime.getMonth()+1);

    const hourTime = dateTime.getHours();
    const minuteTime = dateTime.getMinutes();
    return {hourTime, minuteTime, dayOfTheWeek, monthOfTheYear, thisYear, todaysDate: todaysDateAndAcronym};
};
