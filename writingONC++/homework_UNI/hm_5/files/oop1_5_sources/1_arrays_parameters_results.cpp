// oop1_lect5.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
using namespace std;
//void Test(int arr[]) {
//    cout << "test razmer na arr " << sizeof (arr) << endl;
//
//}

void changeSalaries(double sal[], int count, int percent) {
    for (int i{ 0 }; i < count; i++) {
        sal[i] = sal[i] + sal[i] * percent / 100;
    }
}

void print(double* beg, double* end) {
    for (double* p{ beg }; p < end; p++) {
        cout << *p << " ";
    }
    cout << endl;
}

int main1()
{
      /* int arr1[1000]{ 5,6,5 };
       cout << "main razmer na arr " << sizeof (arr1) << endl;
       Test(arr1);*/
    double sal1[5]{ 1200.0, 1400.0, 2100.0, 5200.0, 3400.0 };
    double* sal2 = new double[4]{ 1300.0, 1520.0, 4370.0, 2100.0 };

    cout << "Percent?";
    int p;
    cin >> p;

    cout << "sal1 before\n";
    print(sal1, sal1 + 5);
    changeSalaries(sal1, 5, p);
    cout << "sal1 after change\n";
    print(sal1, sal1 + 5);

    cout << "\nsal2 before\n";
    print(sal2, sal2 + 4);
    changeSalaries(sal2, 4, p);
    cout << "sal2 after change\n";
    print(sal2, sal2 + 4);

    delete[] sal2;
    return 0;
}

