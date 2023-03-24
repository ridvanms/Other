// oop1_lect6.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <cmath>
using namespace std;
 
//Дефиниране на тип указател към фунцкия с определен прототип
using func_p = double (*) (double); // 1 параметър  double
                                     // връща double

//Функция, която има за параметър указател към функция от тип func_p
 void changeArray(double nums[], int size, func_p func) {
 // void changeArray(double nums[], int size, double (*func)(double)){
    for (int i{ 0 }; i < size; i++) {
        nums[i] = func(nums[i]);
     }
}
  void printArray(double nums[], int size) {
      for (int i{ 0 }; i < size; i++) {
          cout << nums[i] << " ";
      }
      cout << endl;
  }

  //Функции с прототипи, съответстващи на func_p
  double f1(double x) { return x + 2; }
  double f2(double x) { return x / 5; }

int main1()
{
    const int SIZE{ 4 };
    double arr[SIZE]{ 1.3, 5.2, 2.6, 7.8 };
    printArray(arr, SIZE);
    changeArray(arr, SIZE, f1);
    printArray(arr, SIZE);
    cout << endl;
    changeArray(arr, SIZE, f2);
    printArray(arr, SIZE);
    cout << endl;

    changeArray(arr, SIZE, sqrt);
    printArray(arr, SIZE);
    cout << endl;

    //Ламбда-функция - дефинира се на мястото на използването
    auto f3 = [](double x) {return x - 1; };
    changeArray(arr, SIZE, f3);
    printArray(arr, SIZE);
    cout << endl;

    changeArray(arr, SIZE, [](double x) {return x * 10; });
    printArray(arr, SIZE);
    cout << endl;

    return 0;
}
