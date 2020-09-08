# Bishop Bash

In this problem, you will determine the number of opponent pawns in your bishop's line of action. (A pawn is on a bishop's line of action if it's on either of the bishop's two diagonals.)

## Chess Rules

In this problem, we'll deviate slightly from chess standards.

Here are a few important notes:

* Let the rows be numbered 1 through 8, as standard. 

* Let the columns also be numbered 1 through 8. 

* Bishops move diagonally and have no restriction regarding distance.

* Each player begins with 8 pawns.

For example, in the chess board below, the bishop is located at row 3, column 4. Its line of action is labelled with a dash. The opponent has pawns at the positions labelled "P," namely Row 3, Column 8; Row 1, Column 6; Row 5, Column 6; Row 8, Column 7.

|   |   |   |   |   |   |       |   |   |
|---|---|---|---|---|---|-------|---|---|
| 8 |   |   |   |   |   |       | P |   |
| 7 |   |   |   |   |   |       |   | – |
| 6 | – |   |   |   |   |       | – |   |
| 5 |   | – |   |   |   | ~~P~~ |   |   |
| 4 |   |   | – |   | – |       |   |   |
| 3 |   |   |   | B |   |       |   | P |
| 2 |   |   | – |   | – |       |   |   |
| 1 |   | – |   |   |   | ~~P~~ |   |   |
|   | 1 | 2 | 3 | 4 | 5 |   6   | 7 | 8 |


In this case, there are 2 pawns in the bishop's line of action.

## Specification

* Prompt the user for the row and column of the bishop using `get_int`.

* Prompt the user for the opponent's remaining number of pawns. This number should not exceed 8.

* Iterate through each pawn, prompting the user for the row and column each time. 

* Within each iteration, determine if the pawn is in the bishop's line of action.

* If the pawn is in the bishop's line of action, add one to a counter that keeps a running count of the desired number.

* Print as output the number of pawns in the bishop's line of action.

## Sample Output

```
$ ./bishopbash
Bishop Row #: 3
Bishop Column #: 4
Number of Pawns: 4
Pawn Row #: 3
Pawn Column #: 8
Pawn Row #: 1
Pawn Column #: 6
Pawn Row #: 5
Pawn Column #: 6
Pawn Row #: 8
Pawn Column #: 7
2 pawns are in the bishop's line of action.
```



