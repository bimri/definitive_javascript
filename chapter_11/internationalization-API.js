// 11.7 The Internationalization API
/* The JavaScript internationalization API consists of the three classes Intl.NumberFormat,
Intl.DateTimeFormat, and Intl.Collator that allow us to format numbers (including
monetary amounts and percentages), dates, and times in locale-appropriate ways
and to compare strings in locale-appropriate ways. */

// 11.7.1 Formatting Numbers
let euros = Intl.NumberFormat("es", {style: "currency", currency: "EUR"});
euros.format(10)                                // => "10,00 €": ten euros, Spanish formatting

let pounds = Intl.NumberFormat("en", {style: "currency", currency: "GBP"});
pounds.format(1000)                             // => "£1,000.00": One thousand pounds, English formatting

/* A useful feature of Intl.NumberFormat (and the other Intl classes as well) is that its
format() method is bound to the NumberFormat object to which it belongs. So
instead of defining a variable that refers to the formatting object and then invoking
the format() method on that, you can just assign the format() method to a variable
and use it as if it were a standalone function */
let data = [0.05, .75, 1];
let formatData = Intl.NumberFormat(undefined, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
}).format;

data.map(formatData)                            // => ["5.0%", "75.0%", "100.0%"]: in en-US locale

// Some languages, such as Arabic, use their own script for decimal digits:
let arabic = Intl.NumberFormat("ar", {useGrouping: false}).format;
arabic(1234567890)                              // => "١٢٣٤٥٦٧٨٩٠"

let hindi = Intl.NumberFormat("hi-IN-u-nu-deva").format;
hindi(1234567890)                               // => "१,२३,४५,६७,८९०"


// 11.7.2 Formatting Dates and Times
let d = new Date("2020-01-02T13:14:15Z");       // January 2nd, 2020, 13:14:15 UTC

// With no options, we get a basic numeric date format
Intl.DateTimeFormat("en-US").format(d)          // => "1/2/2020"
Intl.DateTimeFormat("fr-FR").format(d)          // => "02/01/2020"

// Spelled out weekday and month
let optss = { weekday: "long", month: "long", year: "numeric", day: "numeric" };
Intl.DateTimeFormat("en-US", optss).format(d)    // => "Thursday, January 2, 2020"
Intl.DateTimeFormat("es-ES", optss).format(d)    // => "jueves, 2 de enero de 2020"

// The time in New York, for a French-speaking Canadian
optss = { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" };
Intl.DateTimeFormat("fr-CA", opts).format(d)    // => "8 h 14"

/* Intl.DateTimeFormat can display dates using calendars other than the default Julian
calendar based on the Christian era. Although some locales may use a non-Christian
calendar by default, you can always explicitly specify the calendar to use by adding
-u-ca- to the locale and following that with the name of the calendar. Possible calendar
names include “buddhist”, “chinese”, “coptic”, “ethiopic”, “gregory”, “hebrew”,
“indian”, “islamic”, “iso8601”, “japanese”, and “persian”. */
let opts = { year: "numeric", era: "short" };
Intl.DateTimeFormat("en", opts).format(d)                       // => "2020 AD"
Intl.DateTimeFormat("en-u-ca-iso8601", opts).format(d)          // => "2020 AD"
Intl.DateTimeFormat("en-u-ca-hebrew", opts).format(d)           // => "5780 AM"
Intl.DateTimeFormat("en-u-ca-buddhist", opts).format(d)         // => "2563 BE"
Intl.DateTimeFormat("en-u-ca-islamic", opts).format(d)          // => "1441 AH"
Intl.DateTimeFormat("en-u-ca-persian", opts).format(d)          // => "1398 AP"
Intl.DateTimeFormat("en-u-ca-indian", opts).format(d)           // => "1941 Saka"
Intl.DateTimeFormat("en-u-ca-chinese", opts).format(d)          // => "36 78"
Intl.DateTimeFormat("en-u-ca-japanese", opts).format(d)         // => "2 Reiwa"


// 11.7.3 Comparing Strings
/* This compare() method that takes two strings and returns a number less than, equal
to, or greater than zero is exactly what the Array sort() method expects for its
optional argument. Also, Intl.Collator automatically binds the compare() method to
its instance, so you can pass it directly to sort() without having to write a wrapper
function and invoke it through the collator object. */

// A basic comparator for sorting in the user's locale.
// Never sort human-readable strings without passing something like this:
const collator = new Intl.Collator().compare;
["a", "z", "A", "Z"].sort(collator)                         // => ["a", "A", "z", "Z"]

// Filenames often include numbers, so we should sort those specially
const filenameOrder = new Intl.Collator(undefined, { numeric: true }).compare;
["page10", "page9"].sort(filenameOrder)                     // => ["page9", "page10"]

// Find all strings that loosely match a target string
const fuzzyMatcher = new Intl.Collator(undefined, {
    sensitivity: "base",
    ignorePunctuation: true
}).compare;
let strings = ["food", "fool", "Føø Bar"];
strings.findIndex(s => fuzzyMatcher(s, "foobar") === 0)     // => 2

// Some locales have more than one possible collation order.
/* And in China, collation order can be
based on character encodings, the base radical and strokes of each character, or on
the Pinyin romanization of characters. */

// Before 1994, CH and LL were treated as separate letters in Spain
const modernSpanish = Intl.Collator("es-ES").compare;
const traditionalSpanish = Intl.Collator("es-ES-u-co-trad").compare;
let palabras = ["luz", "llama", "como", "chico"];
palabras.sort(modernSpanish)                                // => ["chico", "como", "llama", "luz"]
palabras.sort(traditionalSpanish)                           // => ["como", "chico", "luz", "llama"]
