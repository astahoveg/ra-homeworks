'use strict';

function strToDate(str) {
  return new Date(str.substr(0,4),+str.substr(5,2)-1,str.substr(8,2),str.substr(11,2),str.substr(14,2),str.substr(17,2));
}

function replaceDate(date) {
    const nowDate = new Date();
    const difference = nowDate - date;
    const min = 60000;
    const hour = 3600000;
    const day = 86400000;
    let str = "";
    
    if (difference < hour) { //Прошло меньше часа
        str = `${Math.round(difference/min)} минут назад`;
    } else if (difference < day) { // Прошло меньше суток
        str = `${Math.round(difference/hour)} часов назад`;
    } else { // Прошло больше суток
        str = `${Math.round(difference/day)} дней назад`;
    }

    return str;
}

function strDateTime(Component) {
    return function (props, ...args) {
        props.date = replaceDate(strToDate(props.date));
        return Component.apply(this, [props, ...args]);
    }
}

const DateTimePretty = strDateTime(DateTime);