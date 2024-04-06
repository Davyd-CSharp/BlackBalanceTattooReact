export const adjustDateStringToInput = (date?: Date, withTime?: boolean) => {
    if(date) {
        const dateString = JSON.stringify(date);
        return dateString?.replace('"', '')
            .slice(0, withTime ? 16 : 10);
    }

    return "";
};