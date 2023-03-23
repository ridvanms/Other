#include <iostream>
#include <string>
using namespace std;

//1.Дефиниция на структура  - задаваме ИМЕ и описание на полетата
struct student {
    string name;  // член-данни (полета)
    int course;
    double grade;
};


int main2()
{
    //2. Използване на новия тип
    //2а - неинициализирана променлива student
    student s1;
    //2b - инициализирана променлива student
    student s2{ "Ivan", 1, 5.6 };

    //2c Достъп до полетата на структурна променлива
    // <име на структурна променлива>.<поле>
    s1.name = "Ana";
    s1.course = 2;
    s1.grade = 3.8;

    cout << s2.name << ", " << s2.course << ", " << s2.grade << endl;

    //2d - указател към структурна пром - неинициализиран
    student* s3 = new student;
    (*s3).name = "Vasil";
    s3->course = 2;
    s3->grade = 5.2;

    //2d - указател към структурна пром -инициализиран
    student* s4 = new student{ "Dimo", 1, 4.8 };
	
	//Заемана памет от структурната променлива
    cout << sizeof s1 << " " << sizeof s2 << " "
        << sizeof *s3 << " " << sizeof *s4 << endl;


    cout << sizeof(string) << endl; 
    return 0;
}