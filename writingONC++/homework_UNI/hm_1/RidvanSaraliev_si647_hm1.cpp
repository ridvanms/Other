#include <iostream>
using namespace std;

int main()
{
    system("chcp 1251>nul");
    int a = 20;
    double b = 2.56;
    char c = '@';
    int *addresA = &a;
    double *addresB = &b;
    char *addresC = &c;
    cout << "addresA= " << addresA << " size of addresA= " << sizeof(addresA) << "B"
         << " addresA= " << *addresA << " size of *addresA= " << sizeof(*addresA) << "B" << endl;
    cout << "addresB= " << addresB << " size of addresB= " << sizeof(addresB) << "B"
         << " addresB= " << *addresB << " size of *addresB= " << sizeof(*addresB) << "B" << endl;
    cout << "addresC= " << static_cast<void *>(addresC) << " size of addresC= " << sizeof(addresC) << "B"
         << " addresC= " << *addresC << " size of *addresC= " << sizeof(*addresC) << "B" << endl;
}