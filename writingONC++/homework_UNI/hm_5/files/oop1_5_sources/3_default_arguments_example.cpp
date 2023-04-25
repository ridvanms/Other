#include <iostream>
#include <string>

using namespace std;

void errorLog(string message = "error", bool cls = false, bool red = false);


int main3()
{
    system("chcp 1251>nul");
 
    errorLog();
    cout << "Използвани  са 3 аргумента по подразбиране\n";
    cin.get();

    errorLog("Файлът не е намерен");
    cout << "Зададен е явно 1-ят  аргумент, 2 и 3 по подразбиране\n";
    cin.get();

    errorLog("Невалиден аргумент", true);
    cout << "Зададени са явно 1-ят и 2-ят аргументи,  3 по подразбиране\n";
    cin.get();
  
    errorLog("Деление на нула", true, true);
    cout << "Зададени са явно всички  аргументи\n";

    //visual basic
    //errorLog(, true); //C++ - ne

    return 0;

}

void errorLog(string message, bool cls , bool red )
{
    if (cls) system("cls");
    if (red) system("color 04");
    cout << message << endl;
}