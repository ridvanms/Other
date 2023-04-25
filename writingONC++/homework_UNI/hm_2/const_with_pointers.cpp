// oop1_lect2.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
using namespace std;

int main1()
{
   
    int* const p1 = new int{ 12 };
    cout << p1 << " "<< *p1 << endl;
    *p1 = *p1 + 100;
    cout << p1 << " " << *p1 << endl;

    
    const int *p2;
    p2 = p1;
    cout << p2 << " " << *p2 << endl; //adress 112

    p2 = new int{ 777 };
    cout << p2 << " " << *p2 << endl;//nov adress 777

    const int* const p3 = new int{ 25 };

    double x{ 1.6 };
    const double* px{ &x };  
    cout << x << " " << *px << endl;

    return 0;
}

