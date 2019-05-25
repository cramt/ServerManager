export function dateToCsharpDate(date: Date): string {
    let iso = new Date((date as any as number) - date.getTimezoneOffset()).toISOString()
    iso = iso.substring(0, iso.length - 1)
    let timezoneDirOffset = date.getTimezoneOffset() === 0 ? null : date.getTimezoneOffset() / Math.abs(date.getTimezoneOffset())
    let timezoneStr = "+00:00"
    if (timezoneDirOffset !== null) {
        let timezoneOffset = Math.abs(date.getTimezoneOffset())
        let timezoneHour = Math.floor(timezoneOffset / 60)
        let timezoneMinutes = Math.floor(timezoneOffset % 60)
        let timezoneHourStr = timezoneHour + "";
        if (timezoneHourStr.length === 1) {
            timezoneHourStr = "0" + timezoneHourStr;
        }
        let timezoneMinutesStr = timezoneMinutes + "";
        if (timezoneMinutesStr.length === 1) {
            timezoneMinutesStr = "0" + timezoneMinutesStr;
        }
        timezoneDirOffset *= -1;
        timezoneStr = (timezoneDirOffset > 0 ? "+" : "-") + timezoneHourStr + ":" + timezoneMinutesStr
    }
    return iso + timezoneStr;
}

export function formatDate(date: Date): string {
    let options: Intl.DateTimeFormatOptions = {
        second: "2-digit",
        minute: "2-digit",
        hour: "2-digit",
        month: "2-digit",
        year: "numeric",
        day: "2-digit"
    }
    return date.toLocaleDateString("en-GB", options)
}