# Sorting for Hours

In this problem, you will implement a sort that will sort each Computer Science class at Harvard by their average workload (in hours). The data in this problem was obtained from the 2018 - 2019 Q evaluations. 

## Selection Sort

* Recall that in selection sort, in each pass, we select the smallest number and place it in the correct location. 

* Let's start with these unsorted numbers. We wish to sort them in ascending order.

    |0|1|2|3|4|5|6|7|
    |-|-|-|-|-|-|-|-|
    |2|3|1|5|8|7|6|4|

    * First pass:

        * We look at the first unsorted number, which is 2. Now, we look at the rest of the list.

            * 3 is greater than 2, so 2 is still the smallest.
            * 1 is less than 2, so 1 is now the smallest.
            * 5 is greater than 1, so 1 is still the smallest.
            * 8 is greater than 1, so 1 is still the smallest.
            * ...
            * 4 is greater than 1, so 1 is still the smallest.

        * Now, we swap the 1 with the first unsorted number, or 2. We get this list:

            |0|1|2|3|4|5|6|7|
            |-|-|-|-|-|-|-|-|
            |1|3|2|5|8|7|6|4|

    * Second pass:

        * We look at the first unsorted number, which is 3. Now, we look at the rest of the list.

            * 2 is less than 3, so 2 is now the smallest.
            * 5 is greater than 2, so 2 is still the smallest.
            * 8 is greater than 2, so 2 is still the smallest.
            * ...
            * 4 is greater than 2, so 2 is still the smallest.

        * Now, we swap the 2 with the first unsorted number, or 3. We get this list:

            |0|1|2|3|4|5|6|7|
            |-|-|-|-|-|-|-|-|
            |1|2|3|5|8|7|6|4|

    * We proceed similarly until we've completed `n` passes.

* The pseudocode we might write is:

    ```
    for i from 0 to n-1
        find smallest element between i'th and n-1'th
        swap smallest with i'th element
    ```

## Input

* 52 Computer Science courses and their respective hours have been added into an array of `classes`, where `classes` is a `struct` that we've defined as follows:

    ```C
    typedef struct
    {
        string name;
        double hours;
    }
    classes;
    ```

    * Each object of type `classes` will have a `name` property and an `hours` property, with `name` of type `string` and `hours` of type `double`. 

    * As a reminder, to access the name of the course at the 3rd index of array `cs_list`, we can simply write `cs_list[3].name`. 


## Specification

* According to the pseudocode above, implement a selection sort for the 52 classes inside the already defined `sort(classes cs_list[])` function. This sort should be based on the number of hours for each course. 
  
* Note that the `cs_list[]` argument of type `classes` denotes that the input to the function is an array of `classes` objects called `cs_list`.

* Within this `sort(classes cs_list[])` function, after completing the sort, iterate through the array once more to print out each class and their workload. For example, the first few lines of output might look like this: 

    ```
    Class: COMPSCI 90NCR    Hours: 2.700000
    Class: COMPSCI 191      Hours: 3.700000
    Class: COMPSCI 247R     Hours: 3.700000
    ```

* For classes with the same number of hours, their order does not matter.

## Solution

* This is a solution for the selection sort – the remainder of the program can be found in `hours.c`. 
```C
void sort(classes cs_list[])
{
    for (int i = 0; i < 52; i++)
    {
        string cur_name = cs_list[i].name;
        double cur_hours = cs_list[i].hours;

        double min_hours = cur_hours;
        int index = i;

        for(int j = i + 1; j < 52; j++)
        {
            if (cs_list[j].hours < min_hours)
            {
                min_hours = cs_list[j].hours;
                index = j;
            }
        }
        cs_list[i].name = cs_list[index].name;
        cs_list[i].hours = cs_list[index].hours;

        cs_list[index].name = cur_name;
        cs_list[index].hours = cur_hours;
    }

    for (int i = 0; i < 52; i++)
    {
        printf("%s%s%s%f%s", "Class: ", cs_list[i].name, "Hours: ", cs_list[i].hours, "\n");
    }
}
```