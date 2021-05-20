export function getHex() {
    const hexColors = [
        "#3e3c41",
        "fdfefe",
        "cc0f39",
        "0ffbf9",
        "c2bfcc",
        "c36b93",
        "cdc764",
    ];
    let index = Math.floor(Math.random() * 7);
    return "#" + hexColors[index];
}

export function pluralize(n, singularWord) {
    return n === 1 ? singularWord : singularWord + "s";
}

export function fixTimeFormat(timeUnit) {        
    return timeUnit < 10 ? `0${timeUnit}` : ""+timeUnit
}

export function timeConvertor(tims) {
    const seconds = 1 * 1000;
    const minutes = 60 * seconds;
    const hours = 60 * minutes;
    const days = 24 * hours;
    const years = 365 * days;

    const timeObject = {
        seconds: Math.floor((tims % minutes) / seconds),
        minutes: Math.floor((tims % hours) / minutes),
        hours: Math.floor((tims % days) / hours),
        days: Math.floor((tims % years) / days),
        years: Math.floor(tims / years),
    };

    for (const key in timeObject) {
        if(timeObject[key] <= 0) {
            timeObject[key] = 0;
        }
        timeObject[key] = fixTimeFormat(timeObject[key]);
    }

    return timeObject;
}
