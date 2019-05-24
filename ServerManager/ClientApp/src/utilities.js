"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function dateToCsharpDate(date) {
    var iso = new Date(date - date.getTimezoneOffset()).toISOString();
    iso = iso.substring(0, iso.length - 1);
    var timezoneDirOffset = date.getTimezoneOffset() === 0 ? null : date.getTimezoneOffset() / Math.abs(date.getTimezoneOffset());
    var timezoneStr = "+00:00";
    if (timezoneDirOffset !== null) {
        var timezoneOffset = Math.abs(date.getTimezoneOffset());
        var timezoneHour = Math.floor(timezoneOffset / 60);
        var timezoneMinutes = Math.floor(timezoneOffset % 60);
        var timezoneHourStr = timezoneHour + "";
        if (timezoneHourStr.length === 1) {
            timezoneHourStr = "0" + timezoneHourStr;
        }
        var timezoneMinutesStr = timezoneMinutes + "";
        if (timezoneMinutesStr.length === 1) {
            timezoneMinutesStr = "0" + timezoneMinutesStr;
        }
        timezoneDirOffset *= -1;
        timezoneStr = (timezoneDirOffset > 0 ? "+" : "-") + timezoneHourStr + ":" + timezoneMinutesStr;
    }
    return iso + timezoneStr;
}
exports.dateToCsharpDate = dateToCsharpDate;
//# sourceMappingURL=utilities.js.map