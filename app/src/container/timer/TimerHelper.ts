export const getTimeString = (seconds: number): string => {
    const minutesDisplay = leftPad(Math.floor(seconds / 60));
    const secondsDisplay = leftPad(seconds % 60);

    return `${minutesDisplay}:${secondsDisplay}`;
};

const leftPad = (time: number): string => {
    return time < 10 ? `0${time}` : `${time}`;
};
