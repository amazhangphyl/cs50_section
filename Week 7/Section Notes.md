# Section 7 Notes

## Warmup Problems

1. 
   - `ID` – Primary Key, Autoincremented, Integer
   - `name` – Varchar(`length`) or Text
   - `level` – Integer
   - `type` – Varchar(`length`) or Text 
2. We want to join the two tables together in order to return one column from the `pokemon` table and one column from the `skills` table. Remember that when we are joining, we are "smashing" two tables together; so we must designate which column of each table we are setting equal to each other. In this case, the `ID` column in `pokemon` is the same as the `ID` column in `skills`, so we can write the following join statement: 
   `SELECT pokemon.name, skills.skill_name FROM pokemon JOIN skills ON pokemon.ID = skills.ID`.
3. We use the `COUNT` function here, and note that `COUNT(*)` effectively counts the number of rows in our selection, where `*` represents *all* of the columns. 
   `SELECT COUNT(*) FROM pokemon WHERE type = "ghost"`
4. We use the `LIKE` function here. Remember to use the `%` operator when using the `LIKE` keyword! `%` simply matches any and all possible characters. So, `%mud` would match "amud", "abmud", etc. `mud%` would match "mudkip" and more. In this case, we can write
   `SELECT name FROM pokemon WHERE name LIKE %mud%`
5. `SELECT name FROM pokemon WHERE level > 5`


## General Syntax

* In SQL, dot notation works as follows: `a.b` refers to the column `b` in table `a`. Once again, `a` is a table, and `b` is a column in the table `a`.
* When __joining__ two tables, you can write `table1 JOIN table2 ON table1.column = table2.column`. This will form a new table!
  * In the same vein, you can join three tables by just writing `JOIN table3 ON` and then your columns immediately after you join the first two tables.
* When __inserting__ into a table, write `INSERT INTO table (columns) VALUES (values)`.
* When __updating__ row(s) in a table, write `UPDATE table SET column = value WHERE predicate`. 
* When __deleting__ row(s) in a table, write `DELETE FROM table WHERE predicate`. 

## Examples from Section

- Creating tables:
  
```sql
CREATE TABLE people (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

CREATE TABLE courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL,
  title TEXT NOT NULL
);

CREATE TABLE students (
  person_id INTEGER NOT NULL,
  course_id INTEGER NOT NULL
);
```

- Inserting data into tables:

```sql
INSERT INTO people (name) VALUES ("Phyllis");
INSERT INTO courses (code, title) VALUES ("CS50", "Introduction to Computer Science");
INSERT INTO courses (code, title) VALUES ("CS51", "Abstraction and Design in Computation");
INSERT INTO courses (code, title) VALUES ("CS121", "Introduction to Theoretical Computer Science");
INSERT INTO students (person_id, course_id) VALUES (1, 1);
```

- Updating data in tables:
  
  Suppose we wish to switch Phyllis's class from CS50 to CS51.

```sql
UPDATE students SET course_id = 
(SELECT id FROM courses WHERE code = "CS51") WHERE person_id = 
(SELECT id FROM people WHERE name = "Phyllis") AND course_id = 
(SELECT id FROM courses WHERE code = "CS50");

```

- Deleting data from tables:

```sql
DELETE FROM courses WHERE code = "CS121";
```

## Lab Solutions (Using JOIN)

In 1.sql, write a SQL query to list the names of all songs in the database.

`SELECT name FROM songs;`

In 2.sql, write a SQL query to list the names of all songs in increasing order of tempo.

`SELECT name FROM songs ORDER BY tempo;`

In 3.sql, write a SQL query to list the names of the top 5 longest songs, in descending order of length.

`SELECT name FROM songs ORDER BY duration_ms DESC LIMIT 5;`

In 4.sql, write a SQL query that lists the names of any songs that have danceability, energy, and valence greater than 0.75.

`SELECT name FROM songs WHERE danceability > 0.75 AND energy > 0.75 AND valence > 0.75;`

In 5.sql, write a SQL query that returns the average energy of all the songs.

`SELECT AVG(energy) from songs;`

In 6.sql, write a SQL query that lists the names of songs that are by Post Malone.

`SELECT songs.name FROM songs JOIN artists ON songs.artist_id = artists.id WHERE artists.name = "Post Malone";`

In 7.sql, write a SQL query that returns the average energy of songs that are by Drake.

`SELECT AVG(energy) FROM songs JOIN artists ON songs.artist_id = artists.id WHERE artist.name = "Drake";`

In 8.sql, write a SQL query that lists the names of the songs that feature other artists.

`SELECT name FROM songs WHERE name LIKE "%feat.%";`
