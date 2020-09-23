#define _DEFAULT_SOURCE
#include <cs50.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct
{
    string name;
    double hours;
}
classes;

void sort(classes cs_list[]){

// SELECTION SORT IMPLEMENTATION 

}


int main()
{
    classes cs_list[52];

    FILE* file = fopen("cs20182019.txt", "r");


    for (int i = 0; i < 52; i++)
    {
        char name[256];
        char hours[256];

        fgets(name, 256, file);
        name[strlen(name)-1]='\0';
        cs_list[i].name = strdup(name);

        fgets(hours, 256, file);
        cs_list[i].hours = atof(hours);
    }

    sort(cs_list);

    free(file);

}
