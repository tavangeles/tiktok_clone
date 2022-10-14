export function formatTimeDiff(date) {
    const currentDate = new Date();
    const newDate = new Date(date);

    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;
    const secondsInWeek = 7 * secondsInDay;

    const timeDiff = Math.abs(((currentDate - newDate) / 1000));
    if (Math.floor(timeDiff) <= 0) {
        return `1s ago`;
    }

    if (timeDiff < secondsInMinute) {
        return `${Math.floor(timeDiff)}s ago`;
    }
    if (timeDiff < secondsInHour) {
        return `${Math.floor(timeDiff/secondsInMinute)}m ago`;
    }
    if (timeDiff < secondsInDay) {
        return `${Math.floor(timeDiff/secondsInHour)}h ago`;
    }
    if (timeDiff < secondsInWeek) {
        return `${Math.floor(timeDiff/secondsInDay)}d ago`;
    }

    return newDate.toLocaleDateString();
}