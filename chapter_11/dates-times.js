// 11.4 Dates and Times
/* The Date class is JavaScript’s API for working with dates and times. Create a Date
object with the Date() constructor. With no arguments, it returns a Date object that
represents the current date and time: */
let now = new Date();                       // The current time

/* If you pass one numeric argument, the Date() constructor interprets that argument
as the number of milliseconds since the 1970 epoch: */
let epoch = new Date(0);                    // Midnight, January 1st, 1970, GMT

/* If you specify two or more integer arguments, they are interpreted as the year, month,
day-of-month, hour, minute, second, and millisecond in your local time zone, as in
the following: */
let century = new Date(2100,                // Year 2099
                       0,                   // December
                       1,                   // 31st
                       2, 3, 4, 5);         // T23:03:04, local time

// One quirk of the Date API is that the first month of a year is number 0, but the first
// day of a month is number 1. If you omit the time fields, the Date() constructor
// defaults them all to 0, setting the time to midnight.

/* Note that when invoked with multiple numbers, the Date() constructor interprets
them using whatever time zone the local computer is set to. If you want to specify a
date and time in UTC (Universal Coordinated Time, aka GMT), then you can use the
Date.UTC(). */
// Midnight in England, January 1, 2100
let cent = new Date(Date.UTC(2100, 0, 1));

/* if you pass a string to the Date() constructor, it will attempt to parse that
string as a date and time specification. */
let centu = new Date("2100-01-01T00:00:00Z");        // An ISO format date


// Once you have a Date object, various get and set methods allow you to query and
// modify the year, month, day-of-month, hour, minute, second, and millisecond fields
// of the Date. Each of these methods has two forms: one that gets or sets using local
// time and one that gets or sets using UTC time. To get or set the year of a Date object,
// for example, you would use getFullYear(), getUTCFullYear(), setFullYear(), or
// setUTCFullYear():
let d = new Date();                                 // Start with the current date
d.setFullYear(d.getFullYear() + 1);                 // Increment the year

/* To get or set the other fields of a Date, replace “FullYear” in the method name with
“Month”, “Date”, “Hours”, “Minutes”, “Seconds”, or “Milliseconds”. Some of the date set
methods allow you to set more than one field at a time. setFullYear() and setUTC
FullYear() also optionally allow you to set the month and day-of-month as well.
And setHours() and setUTCHours() allow you to specify the minutes, seconds, and
milliseconds fields in addition to the hours field. */

/* Note that the methods for querying the day-of-month are getDate() and getUTC
Date(). The more natural-sounding functions getDay() and getUTCDay() return the
day-of-week (0 for Sunday through 6 for Saturday). The day-of-week is read-only, so
there is not a corresponding setDay() method. */



// 11.4.1 Timestamps
/* For any Date object, the getTime() method returns this internal value, and the set
Time() method sets it. */
d.setTime(d.getTime() + 30000);

/* These millisecond values are sometimes called timestamps, and it is sometimes useful
to work with them directly rather than with Date objects. The static Date.now()
method returns the current time as a timestamp and is helpful when you want to
measure how long your code takes to run: */
let startTime = Date.now();
reticulateSplines();                                // Do some time-consuming operation
let endTime = Date.now();
console.log(`Spline reticulation took ${endTime - startTime}ms.`);

// 11.4.2 Date Arithmetic
/* operators. And you can subtract one Date object from another to determine the number
of milliseconds between the two dates. (This works because the Date class defines
a valueOf() method that returns a timestamp.)

If you want to add or subtract a specified number of seconds, minutes, or hours from
a Date, it is often easiest to simply modify the timestamp as demonstrated in the previous
example, when we added 30 seconds to a date. This technique becomes more
cumbersome if you want to add days, and it does not work at all for months and years
since they have varying numbers of days. To do date arithmetic involving days,
months, and years, you can use setDate(), setMonth(), and setYear(). */
let dd = new Date();
dd.setMonth(d.getMonth() + 3, d.getDate() + 14);

// 11.4.3 Formatting and Parsing Date Strings
/* The Date class defines a number of different methods for
converting Date objects to strings. */
let doo = new Date(2020, 0, 1, 17, 10, 30);     // 5:10:30pm on New Year's Day 2020
doo.toString()                                  // => "Wed Jan 01 2020 17:10:30 GMT-0800 (Pacific Standard Time)"
doo.toUTCString()                               // => "Thu, 02 Jan 2020 01:10:30 GMT"
doo.toLocaleDateString()                        // => "1/1/2020": 'en-US' locale
doo.toLocaleTimeString()                        // => "5:10:30 PM": 'en-US' locale
doo.toISOString()                               // => "2020-01-02T01:10:30.000Z"
