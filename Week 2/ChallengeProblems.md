# Week 2

### Palindrome

Write a program `palindrome.c` that takes a string as input, and determines whether it is a palindrome (the same backwards and forwards). This can often be a useful follow-up to `reverse.c`.

(A more-comfortable student variant on this problem is to detect palindromes while ignoring spaces, to identify palindromes like `taco cat`.)

- Topics
    - String manipulation
    - `for` loops
- Sample Usage

    ```bash
    $ ./palindrome
    Text: racecar
    PALINDROME
    ```

    ```bash
    $ ./palindrome
    Text: jellyfish
    NOT PALINDROME
    ```

### Initials

Write a program `initials.c` that takes a user’s full name as input, and outputs their initials.

- Details
    - The program should accept a user’s name using `get_string`
    - Initials should all be printed as uppercase letters, even if the name contains lowercase letters
    - Students can assume that the user’s names will be separated by one space
- Topics
    - Combining loops and conditions
    - Accessing string characters and manipulating strings
    - Using `ctype.h` functions like `toupper`
- Sample Usage

    ```bash
    $ ./initials
    Name: David J. Malan
    DJM
    ```

### Anagram

This problem is a **more comfortable** problem, and works best when students already have familiarity with arrays and strings.

Write a program `anagram.c` that takes two words as input, and determines whether the words are anagrams of one another.

- Details
    - If two words are an exact match (the strings are identical, ignoring case), the program should output `EXACT MATCH`.
    - If either word contains non-alphabetic characters, the program should output `Alphabetic characters only` and return 1.
    - Otherwise, if two words consist of only alphabetic characters, the program should check to see if the letters in the first word can be rearranged (ignoring case) to form the second word. If so, the program should print `ANAGRAM`; if not, the program should print `NOT ANAGRAM`.
  
- Sample Usage

    ```c
    $ ./anagram
    Word 1: listen
    Word 2: silent
    ANAGRAM
    ```

    ```c
    $ ./anagram
    Word 1: program
    Word 2: silent
    NOT ANAGRAM
    ```

    ```c
    $ ./anagram
    Word 1: program
    Word 2: program
    EXACT MATCH
    ```

    ```c
    $ ./anagram
    Word 1: this
    Word 2: cs50
    Alphabetic characters only.
    ```
