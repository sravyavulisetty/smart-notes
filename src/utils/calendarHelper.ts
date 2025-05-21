export const isDateInThisWeek = (date: Date) => {
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()))
    const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    return date >= firstDayOfWeek && date <= lastDayOfWeek;
}

export const isDateFromThisMonth = (date: Date) => {
    const today = new Date();
    return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth()
    )
}