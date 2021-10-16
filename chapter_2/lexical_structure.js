// 2.1 The Text of a JavaScript Program
/*

    JavaScript is a case-sensitive language.
    JavaScript ignores spaces that appear between tokens in programs

    In addition to the regular space character (\u0020), JavaScript also recognizes tabs,
    assorted ASCII control characters, and various Unicode space characters as whitespace.
    JavaScript recognizes newlines, carriage returns, and a carriage return/line feed
    sequence as line terminators.
*/


// 2.2 Comments
/*
    JavaScript supports two styles of comments

    Any text between a // and the end of a
    (line is treated as a comment and is ignored by JavaScript. 
*/


// 2.3 Literals
/*
    12                  // The number twelve
    1.2                 // The number one point two
    "hello world"       // A string of text
    'Hi'                // Another string
    true                // A Boolean value
    false               // The other Boolean value
    null                // Absence of an object
*/


// 2.4 Identifiers and Reserved Words
/*
These are all legal identifiers:
    i
    my_variable_name
    v13
    _dummy
    $str
*/


// 2.4.1 Reserved Words
/*
    as      const       export      get         null        target      void
    async   continue    extends     if          of          this        while
    await   debugger    false       import      return      throw       with
    break   default     finally     in          set         true        yield
    case    delete      for         instanceof  static      try
    catch   do          from        let         super       typeof
    class   else        function    new         switch      var

JavaScript also reserves or restricts the use of certain keywords that are not currently
used by the language but that might be used in future versions:

    enum    implements  interface   package     private     protected   public
*/


// 2.5 Unicode
/*
    JavaScript programs are written using the Unicode character set, and you can use any
    Unicode characters in strings and comments. For portability and ease of editing, it is
    common to use only ASCII letters and digits in identifiers.
*/

// 2.5.1 Unicode Escape Sequences
/*
    The Unicode escape for the character
    “é,” for example, is \u00E9; here are three different ways to write a variable name that
    includes this character:
        let café = 1;                   // Define a variable using a Unicode character
        caf\u00e9                       // => 1; access the variable using an escape sequence
        caf\u{E9}                       // => 1; another form of the same escape sequence 
*/
console.log("\u{1F600}");               // Prints a smiley face emoji

// 2.5.2 Unicode Normalization
/*
    If you use non-ASCII characters in your JavaScript programs, you must be aware that
    Unicode allows more than one way of encoding the same character.
        const café = 1; // This constant is named "caf\u{e9}"
        const café = 2; // This constant is different: "cafe\u{301}"
        café // => 1: this constant has one value
        café // => 2: this indistinguishable constant has a different value
    
    The Unicode standard defines the preferred encoding for all characters and specifies
    a normalization procedure to convert text to a canonical form suitable for comparisons.
    JavaScript        

    JavaScript assumes that the source code it is interpreting has already been normalized
    and does not do any normalization on its own. If you plan to use Unicode
    characters in your JavaScript programs, you should ensure that your editor or some
    other tool performs Unicode normalization of your source code to prevent you from
    ending up with different but visually indistinguishable identifiers.
*/


// 2.6 Optional Semicolons
/*
    JavaScript uses the semicolon (;) to separate statements from one another.
        a = 3;
        b = 4;
        Written as follows, however, the first semicolon is required:
        a = 3; b = 4;

    Note that JavaScript does not treat every line break as a semicolon

    Note that JavaScript does not treat every line break as a semicolon: it usually treats
    line breaks as semicolons only if it can’t parse the code without adding an implicit
    semicolon.
    let a
        a
        =
        3
        console.log(a)
    
        JavaScript interprets this code like this:
        let a; a = 3; console.log(a);
*/
