#include <iostream>
using namespace std;

struct place4all {
    double d;
    int i;
    char c;
};

union one4all {
    double d;
    int i;
    char c;
};

int main3()
{
    system("chcp 1251>nul");
    cout << "Размер на struct place4all: " << sizeof(place4all) << endl; //16
    cout << "Размер на union one4all: " << sizeof(one4all) << endl; //8
    cin.get();

    //в даден момент може да се използва едно от
    //полетата на обединението
    one4all uvar;
    uvar.c = 'ю';
    cout << "uvar.c=" << uvar.c << endl;

    uvar.d = 1.75e-14;
    cout << "uvar.d=" << uvar.d << endl;

    //учебна цел
    cout << "\nСлед използване на полето d на one4all\n";
    cout << "uvar.c=" << uvar.c << endl; //неопределено

    return 0;
}
